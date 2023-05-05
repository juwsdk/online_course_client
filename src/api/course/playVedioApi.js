import request from "@/api";

const playVedioInterface = {
  play: "/video/getResource",
};

export function playVideo(srcUrl) {
  return request({
    url: playVedioInterface.play,
    params: {srcUrl},
    responseType: "blob",
  });
}
