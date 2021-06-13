import React, { Component } from "react";

class Footer extends Component {
  state = {
    albums: [
      { name: "english", link: "english" },
      { name: "hindi", link: "english" },
      { name: "telgu", link: "english" },
      { name: "punjabi", link: "english" },
      { name: "tamil", link: "english" },
      { name: "kannada", link: "english" },
      { name: "bhojpuri", link: "english" },
      { name: "malayalam", link: "english" },
      { name: "marathi", link: "english" },
      { name: "bengali", link: "english" },
      { name: "gujrati songs", link: "english" },
      { name: "haryanvi", link: "english" },
    ],
    genres: [
      { name: "bollywood songs", link: "genres" },
      { name: "romantic songs", link: "genres" },
      { name: "devotional songs", link: "genres" },
      { name: "ghazals", link: "genres" },
      { name: "bhajan", link: "genres" },
      { name: "patriotic songs", link: "genres" },
      { name: "kids songs", link: "genres" },
      { name: "rock songs", link: "genres" },
      { name: "disco songs", link: "genres" },
      { name: "sufi songs", link: "genres" },
      { name: "love songs", link: "genres" },
      { name: "patriotic", link: "english" },
    ],
    artists: [
      { name: "arijit singh", link: "artist" },
      { name: "neha kakkar", link: "artist" },
      { name: "honey singh", link: "artist" },
      { name: "atif aslam", link: "artist" },
      { name: "a R Rahman", link: "artist" },
      { name: "lata mangeshkar", link: "artist" },
      { name: "kishore kumar", link: "artist" },
      { name: "armaan malik", link: "artist" },
      { name: "sunidhi chauhan", link: "artist" },
      { name: "nasrat fateh ali khan", link: "artist" },
      { name: "mohammad rafi", link: "artist" },
      { name: "guru randhwa", link: "english" },
      { name: "justin bieber", link: "english" },
    ],
    newRelease: [
      { name: "bollywood songs", link: "genres" },
      { name: "romantic songs", link: "genres" },
      { name: "devotional songs", link: "genres" },
      { name: "ghazals", link: "genres" },
      { name: "bhajan", link: "genres" },
      { name: "patriotic songs", link: "genres" },
      { name: "kids songs", link: "genres" },
      { name: "rock songs", link: "genres" },
      { name: "disco songs", link: "genres" },
      { name: "sufi songs", link: "genres" },
      { name: "love songs", link: "genres" },
      { name: "patriotic", link: "english" },
    ],
    trendingSongs: [
      { name: "Baadami Rang", link: "trendingSong" },
      { name: "Burg Khalifa", link: "trendingSong" },
      { name: "Nach Meri Rani", link: "trendingSong" },
      { name: "Mujhe toh Hai", link: "trendingSong" },
      { name: "Tum Hi Aana", link: "trendingSong" },
      { name: "Sohna Nai", link: "trendingSong" },
      { name: "Leja Re", link: "trendingSong" },
      { name: "Lamagergini", link: "trendingSong" },
      { name: "Baby Doll", link: "trendingSong" },
      { name: "Kya Karu", link: "trendingSong" },
      { name: "Bewafaa", link: "trendingSong" },
      { name: "Banjara", link: "english" },
    ],
    trendingAlbum: [
      { name: "Happy BirthDay", link: " trendingAlbum" },
      { name: "Sad songs", link: " trendingAlbum" },
      { name: "pk", link: " trendingAlbum" },
      { name: "malang", link: " trendingAlbum" },
      { name: "taki taki", link: " trendingAlbum" },
      { name: "maharshi", link: " trendingAlbum" },
      { name: "murdered by", link: " trendingAlbum" },
      { name: "sadak 2", link: " trendingAlbum" },
      { name: "narasimbha reddy", link: " trendingAlbum" },
      { name: "laxmi bomb", link: " trendingAlbum" },
      { name: "sadak", link: " trendingAlbum" },
      { name: "mandi", link: "english" },
    ],
  };
  render() {
    const {
      albums,
      genres,
      artists,
      newRelease,
      trendingSongs,
      trendingAlbum,
    } = this.state;
    return (
      <>
        <div
          className="row  border-top mx-1"
          style={{
            backgroundColor: "#efefef",
            color: "rgba(0,0,0,0.5)",
            fontSize: 12,

            fontFamily: "'proximanova-regular-webfont',arial",
          }}
        >
          <div className="col-12">
            <div className="row ">
              <div className="col-4">
                <div className="row my-4">
                  <div className="col-12">
                    <span style={{ fontSize: 14, color: "rgba(0,0,0,0.75" }}>
                      Albums
                    </span>
                  </div>
                  <div className="col-12">
                    {albums.map((album, index) =>
                      albums.length - 1 !== index ? (
                        <span
                          style={{
                            textTransform: "capitalize",
                            wordSpacing: 1,
                            lineHeight: 2,
                          }}
                        >
                          {album.name} |{" "}
                        </span>
                      ) : (
                        <span
                          style={{
                            textTransform: "capitalize",
                            wordSpacing: 1,
                            lineHeight: 2,
                          }}
                        >
                          {album.name}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row my-4">
                  <div className="col-12">
                    <span style={{ fontSize: 14, color: "black" }}>Genres</span>
                  </div>
                  <div className="col-12">
                    {genres.map((genre, index) =>
                      genres.length - 1 !== index ? (
                        <span
                          style={{
                            textTransform: "capitalize",
                            wordSpacing: 1,
                            lineHeight: 2,
                          }}
                        >
                          {genre.name} |{" "}
                        </span>
                      ) : (
                        <span
                          style={{
                            textTransform: "capitalize",
                            wordSpacing: 1,
                            lineHeight: 2,
                          }}
                        >
                          {genre.name}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row my-4">
                  <div className="col-12">
                    <span style={{ fontSize: 14, color: "black" }}>
                      Artists
                    </span>
                  </div>
                  <div className="col-12">
                    {artists.map((artist, index) =>
                      artists.length - 1 !== index ? (
                        <span
                          style={{
                            textTransform: "capitalize",
                            wordSpacing: 1,
                            lineHeight: 2,
                          }}
                        >
                          {artist.name} |{" "}
                        </span>
                      ) : (
                        <span
                          style={{
                            textTransform: "capitalize",
                            wordSpacing: 1,
                            lineHeight: 2,
                          }}
                        >
                          {artist.name}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row my-4">
                  <div className="col-12">
                    <span style={{ fontSize: 14, color: "black" }}>
                      New Release
                    </span>
                  </div>
                  <div className="col-12">
                    {newRelease.map((obj, index) =>
                      newRelease.length - 1 !== index ? (
                        <span
                          style={{
                            textTransform: "capitalize",
                            wordSpacing: 1,
                            lineHeight: 2,
                          }}
                        >
                          {obj.name} |{" "}
                        </span>
                      ) : (
                        <span
                          style={{
                            textTransform: "capitalize",
                            wordSpacing: 1,
                            lineHeight: 2,
                          }}
                        >
                          {obj.name}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row my-4">
                  <div className="col-12">
                    <span style={{ fontSize: 14, color: "black" }}>
                      Trending Songs
                    </span>
                  </div>
                  <div className="col-12">
                    {trendingSongs.map((obj, index) =>
                      trendingSongs.length - 1 !== index ? (
                        <span
                          style={{
                            textTransform: "capitalize",
                            wordSpacing: 1,
                            lineHeight: 2,
                          }}
                        >
                          {obj.name} |{" "}
                        </span>
                      ) : (
                        <span
                          style={{
                            textTransform: "capitalize",
                            wordSpacing: 1,
                            lineHeight: 2,
                          }}
                        >
                          {obj.name}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row my-4">
                  <div className="col-12">
                    <span style={{ fontSize: 14, color: "black" }}>
                      Trending Albums
                    </span>
                  </div>
                  <div className="col-12">
                    {trendingAlbum.map((album, index) =>
                      trendingAlbum.length - 1 !== index ? (
                        <span
                          style={{
                            textTransform: "capitalize",
                            wordSpacing: 1,
                            lineHeight: 2,
                          }}
                        >
                          {album.name} |{" "}
                        </span>
                      ) : (
                        <span
                          style={{
                            textTransform: "capitalize",
                            wordSpacing: 1,
                            lineHeight: 2,
                          }}
                        >
                          {album.name}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row mt-5"
              style={{
                backgroundColor: "#efefef",
              }}
            >
              <div className="col-7 col-sm-6 col-md-7 col-lg-8">
                <div className="row">
                  <div className="col-12">
                    Gaana is the one-stop solution for all your music needs.
                    Gaana offers you free, unlimited access to over38 million
                    Hindi Songs, Bollywood Music, English MP3 songs, Regional
                    Music &amp; Mirchi Play.
                  </div>
                </div>
              </div>
              <div className="col-5 col-sm-6 col-md-5 col-lg-3 m-auto">
                <div className="d-flex justify-content-around">
                  <div className="d-sm-block d-none pt-2 text-muted">
                    <span style={{ textTransform: "uppercase" }}>
                      Follow us
                    </span>
                  </div>
                  <div
                    className="rounded-circle"
                    style={{
                      backgroundColor: "#3c579a",
                      width: 38,
                      height: 38,
                      paddingLeft: 12,
                      paddingTop: 6,
                    }}
                  >
                    <svg width="18" height="20" viewBox="0 0 10 16">
                      {" "}
                      <path
                        class="fill_path"
                        fill-rule="evenodd"
                        fill="white"
                        d="M2.932 16l-.023-7.273H0V5.818h2.91V4c0-2.7 1.67-4 4.078-4 1.154 0 2.145.086 2.434.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536v1.337H10l-1.455 2.91H6.19V16H2.932z"
                      ></path>{" "}
                    </svg>
                  </div>
                  <div
                    className="rounded-circle"
                    style={{
                      backgroundColor: "#44cef5",
                      width: 38,
                      height: 38,
                      paddingLeft: 11,
                      paddingTop: 8,
                    }}
                  >
                    <svg width="20" height="16" viewBox="0 0 20 16">
                      <path
                        class="fill_path"
                        fill="white"
                        fill-rule="evenodd"
                        d="M18.67.296a7.744 7.744 0 0 1-2.503.978A3.885 3.885 0 0 0 13.292 0C11.12 0 9.355 1.809 9.355 4.04c0 .316.033.623.101.919C6.182 4.79 3.28 3.184 1.336.737A4.112 4.112 0 0 0 .803 2.77c0 1.4.695 2.637 1.753 3.362A3.867 3.867 0 0 1 .77 5.628v.05c0 1.957 1.358 3.59 3.162 3.96a3.838 3.838 0 0 1-1.78.07c.502 1.605 1.956 2.773 3.68 2.805A7.779 7.779 0 0 1 0 14.187 10.965 10.965 0 0 0 6.038 16c7.247 0 11.208-6.154 11.208-11.492 0-.176-.003-.351-.01-.523a8.08 8.08 0 0 0 1.964-2.09 7.715 7.715 0 0 1-2.262.635A4.031 4.031 0 0 0 18.67.296"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row text-center mt-4 mb-3">
              <div className="col-12">
                <div class="bottomlinks">
                  <div class="bot_links">
                    <span
                      class="hideonmobile"
                      target="_blank"
                      href="https://ads.gaana.com/"
                    >
                      Advertise on Gaana.com
                    </span>
                    <span class="hideonmobile">|</span>{" "}
                    <span class="termsofuse" href="/terms.html">
                      Terms of Use
                    </span>
                    <span>|</span>{" "}
                    <span class="privacy-policy" href="/privacy_policy.html">
                      Privacy Policy
                    </span>
                    <span class="hideonmobile">|</span>{" "}
                    <span
                      class="hideonmobile"
                      id="feedback"
                      href="javascript:void(0)"
                    >
                      Feedback
                    </span>
                    <span class="hideonmobile">|</span>{" "}
                    <span
                      class="hideonmobile"
                      id="report-an-issue"
                      href="javascript:void(0)"
                    >
                      Report an issue
                    </span>
                    <span class="hideonmobile">|</span>{" "}
                    <span
                      class="hideonmobile pjax"
                      id="partners"
                      data-pjax=""
                      href="/aboutgaana"
                      data-type="footer-partners"
                      data-value=""
                    >
                      Partners
                    </span>
                    <span class="hideonmobile">|</span>{" "}
                    <span
                      class="hideonmobile"
                      id="sitemap"
                      target="_blank"
                      href="https://gaana.com/sitemap/sitemap.html"
                    >
                      Sitemap
                    </span>
                    <span class="hideonmobile">|</span>{" "}
                    <span
                      class="hideonmobile"
                      id="faq-link"
                      data-pjax=""
                      href="/faq"
                      data-type="footer-partners"
                      data-value=""
                    >
                      FAQ
                    </span>{" "}
                  </div>{" "}
                  <div>© Gamma Gaana Ltd. 2020, All Rights Reserved</div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
