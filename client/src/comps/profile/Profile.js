//acts as a container for the profile sub components
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import ProfileCreds from "./ProfileCreds";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class Profile extends Component {
  componentDidMount() {
    //retrieve the user's handle from the URL
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body bg-info text-white mb-3">
              <div className="row">
                <div className="col-4 col-md-3 m-auto">
                  <img
                    className="rounded-circle"
                    src={profile.user.avatar}
                    alt=""
                  />
                </div>
              </div>
              <div className="text-center">
                <h1 className="display-4 text-center">{profile.user.name}</h1>
                <p className="lead text-center">
                  {profile.status}
                  {isEmpty(profile.company) ? null : (
                    <span> at {profile.company}</span>
                  )}
                </p>

                {isEmpty(profile.location) ? null : <p> {profile.location}</p>}

                <p>
                  {isEmpty(profile.website) ? null : (
                    <a
                      className="text-white p-2"
                      href={`https://` + profile.website}
                      target="_blank"
                    >
                      <i className="fas fa-globe fa-2x" />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.twitter) ? null : (
                    <a
                      className="text-white p-2"
                      href={`https://` + profile.social.twitter}
                      target="_blank"
                    >
                      <i className="fab fa-twitter fa-2x" />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.facebook) ? null : (
                    <a
                      className="text-white p-2"
                      href={`https://` + profile.social.facebook}
                      target="_blank"
                    >
                      <i className="fab fa-facebook fa-2x" />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.linkedin) ? null : (
                    <a
                      className="text-white p-2"
                      href={`https://` + profile.social.linkedin}
                      target="_blank"
                    >
                      <i className="fab fa-linkedin fa-2x" />
                    </a>
                  )}
                  {isEmpty(
                    profile.social && profile.social.instagram
                  ) ? null : (
                    <a
                      className="text-white p-2"
                      href={`https://` + profile.social.instagram}
                      target="_blank"
                    >
                      <i className="fab fa-instagram fa-2x" />
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
