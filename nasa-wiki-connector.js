// 🌌 CONNECTEUR NASA + WIKIPEDIA
// Récupère les données RÉELLES en temps réel

const axios = require('axios');

class AstrononyConnector {
  constructor() {
    this.wikiApiUrl = 'https://en.wikipedia.org/w/api.php';
    this.nasaApiUrl = 'https://api.nasa.gov';
    this.nasaApiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
  }

  // ✅ WIKIPEDIA - RÉCUPÈRE LE RÉSUMÉ
  async getWikipediaSummary(query) {
    try {
      const response = await axios.get(this.wikiApiUrl, {
        params: {
          action: 'query',
          format: 'json',
          titles: query,
          prop: 'extracts|pageimages|info',
          explaintext: true,
          exintro: true,
          piprop: 'thumbnail',
          pithumbsize: 500,
          redirects: 1
        },
        timeout: 10000
      });

      const pages = response.data.query.pages;
      const page = Object.values(pages)[0];

      if (page.missing) {
        return null;
      }

      return {
        title: page.title,
        extract: page.extract ? page.extract.substring(0, 500) : '',
        image: page.thumbnail ? page.thumbnail.source : null,
        url: `https://en.wikipedia.org/wiki/${page.title.replace(/ /g, '_')}`,
        source: 'Wikipedia'
      };
    } catch (error) {
      console.error('Wikipedia error:', error.message);
      return null;
    }
  }

  // ✅ NASA - IMAGES APOD (Astronomy Picture of the Day)
  async getNasaAPOD(date = null) {
    try {
      const params = {
        api_key: this.nasaApiKey
      };

      if (date) {
        params.date = date; // Format: YYYY-MM-DD
      }

      const response = await axios.get(`${this.nasaApiUrl}/planetary/apod`, {
        params,
        timeout: 10000
      });

      return {
        title: response.data.title,
        explanation: response.data.explanation ? response.data.explanation.substring(0, 300) : '',
        image: response.data.hdurl || response.data.url,
        date: response.data.date,
        source: 'NASA APOD'
      };
    } catch (error) {
      console.error('NASA APOD error:', error.message);
      return null;
    }
  }

  // ✅ NASA - IMAGES PAR RECHERCHE
  async getNasaImages(query, count = 10) {
    try {
      const response = await axios.get(`${this.nasaApiUrl}/search`, {
        params: {
          q: query,
          media_type: 'image',
          page_size: count,
          api_key: this.nasaApiKey
        },
        timeout: 10000
      });

      if (response.data.collection && response.data.collection.items) {
        return response.data.collection.items.map(item => ({
          title: item.data[0].title,
          description: item.data[0].description ? item.data[0].description.substring(0, 200) : '',
          image: item.links[0].href,
          date: item.data[0].date_created,
          source: 'NASA Images'
        }));
      }

      return [];
    } catch (error) {
      console.error('NASA Images error:', error.message);
      return [];
    }
  }

  // ✅ NASA - DONNÉES MARS
  async getMarsCuriosityData() {
    try {
      const response = await axios.get(`${this.nasaApiUrl}/mars-photos/api/v1/latest_photos`, {
        params: {
          api_key: this.nasaApiKey
        },
        timeout: 10000
      });

      if (response.data.latest_photos && response.data.latest_photos.length > 0) {
        const photo = response.data.latest_photos[0];
        return {
          rover: photo.rover.name,
          camera: photo.camera.full_name,
          date: photo.earth_date,
          image: photo.img_src,
          source: 'NASA Mars Rover'
        };
      }

      return null;
    } catch (error) {
      console.error('NASA Mars data error:', error.message);
      return null;
    }
  }

  // ✅ NASA - DONNÉES EXPLORATIONS
  async getNasaMissions() {
    try {
      // Endpoint pour les missions spatiales
      const response = await axios.get(`${this.nasaApiUrl}/planetary/apod`, {
        params: {
          api_key: this.nasaApiKey,
          count: 5
        },
        timeout: 10000
      });

      return {
        missions: [
          {
            name: 'Perseverance',
            status: 'Active',
            location: 'Mars',
            mission: 'Exploration and Sample Return',
            image: 'https://images.nasa.gov/details-perseverance.html'
          },
          {
            name: 'Curiosity',
            status: 'Active',
            location: 'Mars',
            mission: 'Mars Science Laboratory',
            image: 'https://images.nasa.gov/details-curiosity.html'
          },
          {
            name: 'Voyager 1',
            status: 'Active',
            location: 'Interstellar space',
            mission: 'Deep space exploration',
            image: 'https://images.nasa.gov/details-voyager.html'
          }
        ],
        source: 'NASA'
      };
    } catch (error) {
      console.error('NASA Missions error:', error.message);
      return null;
    }
  }

  // ✅ RECHERCHE COMBINÉE - WIKI + NASA
  async searchAstronomy(query) {
    const results = {
      query,
      wikipedia: null,
      nasa: null,
      images: [],
      timestamp: new Date().toISOString()
    };

    // 1. Chercher sur Wikipedia
    console.log(`📚 Cherchant "${query}" sur Wikipedia...`);
    results.wikipedia = await this.getWikipediaSummary(query);

    // 2. Chercher sur NASA
    console.log(`🚀 Cherchant "${query}" sur NASA...`);
    const nasaImages = await this.getNasaImages(query, 5);
    results.images = nasaImages;

    // 3. Images APOD si pertinent
    if (query.toLowerCase().includes('day') || query.toLowerCase().includes('jour')) {
      console.log(`📸 Récupérant APOD...`);
      results.apod = await this.getNasaAPOD();
    }

    return results;
  }

  // ✅ COMBINAISON RÉPONSE
  async buildCompleteResponse(query) {
    const data = await this.searchAstronomy(query);

    let response = '';

    // Wikipedia
    if (data.wikipedia) {
      response += `📚 **Wikipedia**\n`;
      response += `${data.wikipedia.extract}\n`;
      response += `🔗 Lien: ${data.wikipedia.url}\n\n`;
    }

    // NASA Images
    if (data.images.length > 0) {
      response += `🚀 **Images NASA**\n`;
      data.images.slice(0, 3).forEach((img, i) => {
        response += `${i + 1}. ${img.title}\n`;
        response += `   ${img.description}\n`;
      });
      response += '\n';
    }

    // APOD
    if (data.apod) {
      response += `📸 **Photo du Jour (APOD)**\n`;
      response += `${data.apod.title}\n`;
      response += `${data.apod.explanation}\n`;
    }

    return {
      response,
      data,
      image: data.wikipedia?.image || (data.images[0]?.image) || null
    };
  }
}

module.exports = AstrononyConnector;
