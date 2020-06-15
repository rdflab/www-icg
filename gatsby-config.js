module.exports = {
  siteMetadata: {
    title: `Institute for Cancer Genetics`,
    description: `Institute for Cancer Genetics website`,
    author: `Antony B Holmes <antony@antonyholmes.com>`,
    siteUrl: `https://d3gbammu2xkksk.cloudfront.net`,
    facultyGroups: [`Director`, `Faculty`],
    adminGroups: [`Directors`, `Administrative Staff`, `Web Site`],
    labGroups: [`Faculty`, `Research Staff`],
    paths: {
      researchAreasPath: `/research-areas`,
      labsPath: `/research-areas/labs`,
      facultyPath: `/research-areas/faculty`,
      facultyStaffPath: `/research-areas/faculty-staff`,
      publicationsPath: `/research-areas/publications`,
      adminPath: `/administration`,
      adminStaffPath: `/administration/staff`,
      peoplePath: `/people`,
      newsPath: `/news`,
      eventsPath: `/events`,
    },
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/news`,
        name: `news`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/events`,
        name: `events`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/people`,
        name: `people`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/faculty`,
        name: `faculty`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/faculty-abstracts`,
        name: `faculty-abstracts`,
      },
    },
    // {
    //   resolve: "gatsby-plugin-react-svg",
    //   options: {
    //     rule: {
    //       include: /\.inline\.svg$/,
    //     },
    //   },
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- endexcerpt -->`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Institute for Cancer Genetics`,
        short_name: `ICG`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: `data`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: "/assets/svg",
        },
      },
    },
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Lato`,
    //         variants: [`300`, `400`, `700`],
    //       },
    //       {
    //         family: `Montserrat`,
    //         variants: [`300`, `400`, `700`],
    //       },
    //       {
    //         family: `Inter`,
    //         variants: [`300`, `400`, `700`],
    //       },
    //     ],
    //   },
    // },
    {
      resolve: "gatsby-background-image",
      options: {
        // add your own characters to escape, replacing the default ':/'
        specialChars: "/:",
      },
    },
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        // Configure SASS to process Tailwind
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js"),
        ],
      },
    },
    // `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        ignore: ["react-day-picker/"], // Ignore files/folders
        whitelistPatterns: [
          /w-/,
          /list-/,
          /-link/,
          /DayPicker/,
          /text-gray/,
          /md:hidden/,
          /md:block/,
          /lg:hidden/,
          /lg:block/,
          /xl:hidden/,
          /xl:block/,
          /opacity/,
        ],
        //purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography`,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "www-icg",
        acl: null,
      },
    },
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: true, // boolean, defaults to true - if false API will return unformatted string from new Date()
        formatting: {
          format: "dddd D MMMM, YYYY HH:mm", // string, defaults to "MM/DD/YYYY" - pass in any acceptable date-and-time format
          utc: false, // boolean, defaults to false - output time as UTC or not, following date-and-time API
        },
      },
    },
  ],
}
