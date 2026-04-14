console.log("Secret:", process.env.CRON_SECRET);

const res = await fetch("https://munchmedia.design/api/instagram/cron", {
  headers: {
    authorization: `Bearer ${process.env.CRON_SECRET}`
  }
});
const data = await res.json();
console.log(data);