const sm = require("sitemap");
const fs = require("fs");

const { exportPathMap } = require("./next.config");
const client = require("./src/utils/sanity/client");

client.fetch('*[_id == "global-config"] {url}[0]').then((config) => {
  exportPathMap().then((res) => {
    const sitemap = sm.createSitemap({
      hostname: config.url,
      cacheTime: 600000, // 600 sec (10 min) cache purge period
    });

    Object.keys(res).map((page) => {
      const item = res[page];
      const { includeInSitemap, disallowRobots, _updatedAt } = item;

      if (includeInSitemap && !disallowRobots) {
        sitemap.add({
          url: page,
          lastmod: new Date(_updatedAt),
        });
      }
    });

    fs.writeFile("./out/sitemap.xml", sitemap.toString(), (err) => {
      if (err) throw err;

      // eslint-disable-next-line no-console
      console.log("sitemap.xml updated");
    });
  });
});

export const fixer = "";
