import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
      name: 'NutriPlate',
      short_name: 'NutriPlate',
      description: 'Portioning Precision Health in Every Division',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
    //   theme_color: 'white"',
      orientation: "portrait",
      icons: [
        {
          src: '/web-app-manifest-192x192.png',
          sizes: '192x192',
          purpose: "maskable"
        },
        {
          src: '/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: "maskable"
        },
      ],
    }
  }

// // {
// //     "name": "NutriFe",
// //     "short_name": "NutriFe",
// //     "description": "Nutrition tracking and food analysis at your fingertips",
// //     "start_url": "/",
// //     "display": "standalone",
// //     "background_color": "#ffffff",
// //     "theme_color": "#4CAF50",
// //     "icons": [
// //       {
// //         "src": "/assets/img/logo.png",
// //         "sizes": "192x192",
// //         "type": "image/png"
// //       },
// //       {
// //         "src": "/assets/img/logo-512.png",
// //         "sizes": "512x512",
// //         "type": "image/png"
// //       },
// //       {
// //         "src": "/assets/img/maskable-icon.png",
// //         "sizes": "512x512",
// //         "type": "image/png",
// //         "purpose": "maskable"
// //       }
// //     ],
// //     "screenshots": [
// //       {
// //         "src": "/assets/img/screenshots/home.png",
// //         "sizes": "1280x720",
// //         "type": "image/png",
// //         "form_factor": "wide",
// //         "label": "Home Screen"
// //       },
// //       {
// //         "src": "/assets/img/screenshots/scan.png",
// //         "sizes": "1280x720",
// //         "type": "image/png",
// //         "form_factor": "wide",
// //         "label": "Food Scanning"
// //       }
// //     ],
// //     "orientation": "portrait",
// //     "categories": ["food", "health", "lifestyle"],
// //     "prefer_related_applications": false
// //   }
  

// {
//     "name": "NutriFe",
//     "short_name": "NutriFe",
//     "description": "Nutrition tracking and food analysis at your fingertips",
//     "start_url": "/",
//     "display": "standalone",
//     "background_color": "#ffffff",
//     "theme_color": "#4CAF50",
//     "orientation": "portrait",
//     "categories": [
//       "food",
//       "health",
//       "lifestyle"
//     ],
//     "prefer_related_applications": false,
//     "icons": [
//       {
//         "src": "../manifest-icon-192.maskable.png",
//         "sizes": "192x192",
//         "type": "image/png",
//         "purpose": "any"
//       },
//       {
//         "src": "../manifest-icon-192.maskable.png",
//         "sizes": "192x192",
//         "type": "image/png",
//         "purpose": "maskable"
//       },
//       {
//         "src": "../manifest-icon-512.maskable.png",
//         "sizes": "512x512",
//         "type": "image/png",
//         "purpose": "any"
//       },
//       {
//         "src": "../manifest-icon-512.maskable.png",
//         "sizes": "512x512",
//         "type": "image/png",
//         "purpose": "maskable"
//       }
//     ]
//   }