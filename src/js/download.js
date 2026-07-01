/** Download JS
 *
 * Routes the form to the controller
 *
 */

/** ********* DATA ********* */

/** ********* DOM ********* */
const ffmpegForm = document.querySelector("#ffmpegForm");
const ytdlpForm = document.querySelector("#ytdlpForm");
const ytdlpUrl = document.querySelector("#ytdp-url");
const ffmpegUrl = document.querySelector("#ffmpeg-url");

const ffmpegOutput = document.querySelector("#ffmpegOutput");
const ytdlpOutput = document.querySelector("#ytdlpOutput");

ffmpegForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = ffmpegUrl.value.trim();
  await sendDownloadRequest({
    url,
    endpoint: "/download/ffmpeg",
    outputUrl: ffmpegOutput,
    buttonEl: ffmpegForm.querySelector("button"),
  });
});

ytdlpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = ytdlpUrl.value.trim();

  await sendDownloadRequest({
    url,
    endpoint: "/download/ytdlp",
    outputUrl: ytdlpOutput,
    buttonEl: ytdlpForm.querySelector("button"),
  });
});

/** ********* LISTENERS ********* */

/** ********* FUNCTIONS ********* */
