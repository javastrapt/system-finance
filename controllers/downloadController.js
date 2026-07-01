import { runFfmpegDownload } from "../services/ffmpeg.js";
import { runYtdlpDownload } from "../services/ytdlp.js";

// ffmpeg engine
export async function downloadWithFfmpeg(req, res) {
  0;
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Misiing URL",
      });
    }

    const result = await runFfmpegDownload(url);

    res.json({
      success: true,
      downloader: "ffmpeg",
      result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      downloader: "ffmpeg",
      error: err.message || err,
    });
  }
}

// yytd-lp engine
export async function downloadWithytdlp(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "We need a URL...",
      });
    }
    const result = await runYtdlpDownload(url);

    res.json({
      success: true,
      downloader: "yt-dlp",
      result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      downlaoder: "yt-dlp",
      error: err.message || err,
    });
  }
}
