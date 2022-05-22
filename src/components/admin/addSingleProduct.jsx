import { Field, Form, Formik } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";
import "./addSingleProduct.css";

import FormInput from "../common/input";
import { addSingleSong } from "../../services/musicService";
class AddSingleProduct extends Component {
  state = {
    allPlaylists: [
      { value: "topPicks", name: "Top Picks" },
      { value: "topCharts", name: "Top Chart" },
    ],

    allGenresImg: [
      { name: "hindi", value: "https://i.ibb.co/W2LYBDS/hindi.webp" },
      { name: "punjabi", value: "https://i.ibb.co/2qqppkt/punjabi.webp" },
      { name: "bhakti", value: "https://i.ibb.co/TBWtJc9/bhakti.webp" },
      {
        name: "globallyTrending",
        value: "https://i.ibb.co/Ngqp43C/globally.webp",
      },
      {
        name: "international",
        value: "https://i.ibb.co/x752h9Y/international.webp",
      },
      {
        name: "newReleaseHot",
        value: "https://i.ibb.co/qNrNqx4/new-Release.webp",
      },
      {
        name: "trendingAround",
        value: "https://i.ibb.co/518thjF/trending.webp",
      },
      { name: "romance", value: "https://i.ibb.co/LtFQqf1/romance.webp" },
      { name: "todays", value: "https://i.ibb.co/Gv4bsXb/today.webp" },
      { name: "punjabiParty", value: "https://i.ibb.co/2qqppkt/punjabi.webp" },
      { name: "us", value: "https://i.ibb.co/RvV4hTG/us.webp" },
    ],
  };
  styles = {
    label: {
      fontSize: "clamp(16px,2vw,22px)",
      fontWeight: 500,
      marginLeft: 5,
      fontFamily: "sans-serif",
    },
    product: {
      fontSize: "clamp(16px,2vw,25px)",
      fontWeight: "bold",
    },
  };

  handleSubmit = async (values, { ...rest }) => {
    let selGenreImg = this.state.allGenresImg.find(
      (obj) => obj.name === values.genre
    );
    if (selGenreImg) {
      var genreImg = selGenreImg.value;
    } else {
      alert("No Genre Selected");
      return;
    }

    let data = {
      title: values.title,
      genre: values.genre,
      genre_img: genreImg,
      img: values.img,
      track: values.track,
      playlist: { type: values.playlists },
      time: values.time,
      artist: values.artist,
    };
    alert(JSON.stringify(data));
    try {
      let response = await addSingleSong(data);
      rest.resetForm({
        title: "",
        genre: "",
        genreImg: "",
        img: "",
        track: "",
        playlists: [],
        time: "",
        artist: "",
      });
      console.log(response);

      alert(response.data.msg);
    } catch (error) {}
  };

  render() {
    return (
      <Formik
        initialValues={{
          title: "",
          genre: "",
          time: "",
          img: "",
          track: "",
          playlists: [],
          artist: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Ente Song Title"),
          genre: Yup.string().required("Enter Genre Type"),

          time: Yup.string().required("Enter Song Time"),
          img: Yup.string().required("Enter Song Image"),
          track: Yup.string().required("Enter Music Track Url"),
          playlists: Yup.string().required("Enter Song Playlist Name"),
          artist: Yup.string().required("Enter Artist Name"),
        })}
        onSubmit={this.handleSubmit}
      >
        {({ values, handleChange, errors, touched }) => {
          return (
            <Form>
              <>
                <div className="row border my-3 py-3  ">
                  <div className="col-12">
                    <div className="row my-2 bg-light mx-1 border py-2 ">
                      <div className="col-12 col-md-12 py-1 " id="title">
                        <label
                          className="form-check-label"
                          style={this.styles.label}
                        >
                          Title
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          value={values.title}
                          name="title"
                          onChange={handleChange}
                        />
                        {errors.title && touched.title ? (
                          <div className=" mb-1 py-1  text-danger text-left ">
                            {errors.title}
                          </div>
                        ) : (
                          <div className=" mb-1 py-1 text-danger text-left "></div>
                        )}
                      </div>
                      <div className="col-12 col-md-12 py-1  " id="playlist">
                        <div>
                          <label
                            className="form-check-label"
                            style={this.styles.label}
                          >
                            Playlist :
                          </label>
                        </div>

                        {this.state.allPlaylists.map((tag) => (
                          <div class="form-check form-check-inline">
                            <label class="form-check-label" key={tag.value}>
                              <Field
                                class="form-check-input"
                                name="playlists"
                                type="checkbox"
                                value={tag.value}
                                checked={
                                  values.playlists.find(
                                    (playlist) => playlist === tag.value
                                  )
                                    ? true
                                    : false
                                }
                                onClick={handleChange}
                              />
                              <span>{tag.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                      {/* <div className="col-12 col-md-12 py-1  " id="playlist">
                        <label
                          className="form-check-label"
                          style={this.styles.label}
                        >
                          Playlist
                        </label>
                        <Field
                          as="select"
                          className="form-control"
                          value={values.playlist}
                          name="playlist"
                          onChange={handleChange}
                        >
                          <option value="">Select Playlist</option>
                          {this.state.allPlaylists.map((playlist) => (
                            <option value={playlist.value}>
                              {playlist.name}
                            </option>
                          ))}
                        </Field>
                        {errors.playlist && touched.playlist ? (
                          <div className=" mb-1 py-1  text-danger text-left ">
                            {errors.playlist}
                          </div>
                        ) : (
                          <div className=" mb-1 py-1 text-danger text-left "></div>
                        )}
                      </div> */}
                      <div className="col-12 col-md-12 py-1 " id="genre">
                        <div className="row border mx-1">
                          <div className="col-6">
                            <div className="row">
                              <div className="col-12">
                                <label
                                  className="form-check-label"
                                  style={this.styles.label}
                                >
                                  Genre
                                </label>
                                <Field
                                  as="select"
                                  className="form-control"
                                  value={values.genre}
                                  name="genre"
                                  onChange={handleChange}
                                >
                                  <option value="">Select Genre</option>
                                  {this.state.allGenresImg.map((genre) => (
                                    <option value={genre.name}>
                                      {genre.name}
                                    </option>
                                  ))}
                                </Field>
                                {errors.genre && touched.genre ? (
                                  <div className=" mb-1 py-1  text-danger text-left ">
                                    {errors.genre}
                                  </div>
                                ) : (
                                  <div className=" mb-1 py-1 text-danger text-left "></div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-6 text-right">
                            {this.getGenreImage !== null ? (
                              <img
                                src={this.getGenreImage(values.genre)}
                                style={{
                                  width: 120,
                                  height: 120,
                                  marginTop: 30,
                                  marginRight: 10,
                                  marginBottom: 10,
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 80,
                                  height: 80,
                                  marginTop: 10,
                                }}
                              ></div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-12 py-1 "
                        id="genre Image"
                      ></div>
                      <div className="col-12 col-md-12 py-1 ">
                        <label
                          className="form-check-label"
                          style={this.styles.label}
                        >
                          Time
                        </label>
                        <Field
                          type="time"
                          className="form-control"
                          value={values.time}
                          name="time"
                          onChange={handleChange}
                        />{" "}
                        {errors.time && touched.time ? (
                          <div className=" mb-1  text-danger text-left ">
                            {errors.time}
                          </div>
                        ) : (
                          <div className=" mb-1 py-1 text-danger text-left "></div>
                        )}
                      </div>
                      <div className="col-12 col-md-12 py-1 " id="track">
                        <label
                          className="form-check-label"
                          style={this.styles.label}
                        >
                          Track
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          value={values.track}
                          name="track"
                          onChange={handleChange}
                        />
                        {errors.track && touched.track ? (
                          <div className=" mb-1  text-danger text-left ">
                            {errors.track}
                          </div>
                        ) : (
                          <div className=" mb-1 py-1 text-danger text-left "></div>
                        )}
                      </div>
                      <div className="col-12 col-md-12 py-1 " id="song Image">
                        <div className="row">
                          <div className="col-6">
                            <label
                              className="form-check-label"
                              style={this.styles.label}
                            >
                              Song Images
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              value={values.img}
                              name="img"
                              onChange={handleChange}
                            />
                            {errors.img && touched.img ? (
                              <div className=" mb-1  text-danger text-left ">
                                {errors.img}
                              </div>
                            ) : (
                              <div className=" mb-1 py-1 text-danger text-left "></div>
                            )}
                          </div>
                          <div className="col-6">
                            {values.img ? (
                              <img
                                src={values.img}
                                style={{
                                  width: 80,
                                  height: 80,
                                  marginTop: 30,
                                  marginRight: 10,
                                  marginBottom: 10,
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 80,
                                  height: 80,
                                  marginTop: 10,
                                }}
                              ></div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-12 py-1 " id="artist">
                        <label
                          className="form-check-label"
                          style={this.styles.label}
                        >
                          Artist Name
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          value={values.artist}
                          name="artist"
                          onChange={handleChange}
                        />
                        {errors.artist && touched.artist ? (
                          <div className=" mb-1  text-danger text-left ">
                            {errors.artist}
                          </div>
                        ) : (
                          <div className=" mb-1 py-1 text-danger text-left "></div>
                        )}
                      </div>
                    </div>

                    <div className="row mx-1 my-1">
                      <div className="col-12 text-center">
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg  my-2"
                          style={{ borderRadius: 50 }}
                        >
                          Add Song
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </Form>
          );
        }}
      </Formik>
    );
  }

  getGenreImage(genre) {
    let genreType = this.state.allGenresImg.find((obj) => obj.name === genre);
    if (genreType) {
      return genreType.value;
    } else {
      return null;
    }
  }
}

export default AddSingleProduct;
