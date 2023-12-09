// content.js
const apiUrl = process.env.VUE_APP_API_URL;
const contentUrl = `${apiUrl}/content/1`;

async function fetchContent() {
  try {
    const response = await fetch(contentUrl);

    if (!response.ok) {
      // if its not good then give soem default values

      // throw new Error('Network response was not ok');
      return {
        title: 'Stonecrest Rentalss',
        primaryColor: '#411898',
        secondaryColor: '#6c757d',
        iconPath: '',
        contactInfo: {
          phone: '493-545-8457',
          email: 'Stonecrest@gmail.com',
        },
        socialIcons: [
          {
            icon: 'fa-facebook',
            link: 'https://www.facebook.com',
          },
          {
            icon: 'fa-instagram',
            link: 'https://www.instagram.com',
          },
          {
            icon: 'fa-twitter',
            link: 'https://www.twitter.com',
          },
        ],
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching content:', error);
    return {
      title: 'Stonecrest Rentalss',
      primaryColor: '#411898',
      secondaryColor: '#6c757d',
      iconPath: '',
      contactInfo: {
        phone: '493-545-8457',
        email: 'Stonecrest@gmail.com',
      },
      socialIcons: [
        {
          icon: 'fa-facebook',
          link: 'https://www.facebook.com',
        },
        {
          icon: 'fa-instagram',
          link: 'https://www.instagram.com',
        },
        {
          icon: 'fa-twitter',
          link: 'https://www.twitter.com',
        },
      ],
    };
    // throw error;
  }
}

// Export the content directly by invoking the fetchContent function
export default (async function () {
  return await fetchContent();
})();

// // default content.js
// export default {
//   title: 'Stonecrest Rentalss',
//   primaryColor: '#411898',
//   secondaryColor: '#6c757d',
//   iconPath: '',
//   contactInfo: {
//     phone: '493-545-8457',
//     email: 'Stonecrest@gmail.com',
//   },
//   socialIcons: [
//     {
//       icon: 'fa-facebook',
//       link: 'https://www.facebook.com',
//     },
//     {
//       icon: 'fa-instagram',
//       link: 'https://www.instagram.com',
//     },
//     {
//       icon: 'fa-twitter',
//       link: 'https://www.twitter.com',
//     },
//   ],
// };
