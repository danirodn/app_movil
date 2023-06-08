import 'dotenv/config';

export default {
  "expo": {
    "name": "CRUD_tutorial",
    "slug": "CRUD_tutorial",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.tallerautomotriz.appreact"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "bcbbde98-fa8b-4cc4-824b-ecaa0dc69b1e"
      },
      "apiKey": process.env.API_KEY,
      "authDomain": process.env.AUTH_DOMAIN,
      "projectId": process.env.PROJECT_ID,
      "storageBucket": process.env.STORAGE_BUCKET,
      "messagingSenderId": process.env.MESSAGING_SENDER_ID,
      "appId": process.env.APP_ID
    }
  }
}