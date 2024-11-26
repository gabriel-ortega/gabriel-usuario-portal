import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileUpdate, getSeafarerData } from "../../store/userData";
import { useDispatch } from "react-redux";
import { compareData } from "../../util/helperFunctions/compareData";

export const ReviewUpdate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { profileUpdate, profile } = useSelector((state) => state.currentViews);

  useEffect(() => {
    if (id !== profileUpdate?.id) {
      dispatch(getProfileUpdate(id)); // Cargar el perfil inicial.
    }
  }, [id, profileUpdate?.id, dispatch]);

  useEffect(() => {
    if (profileUpdate?.uid) {
      dispatch(getSeafarerData(profileUpdate.uid)); // Cargar datos del marinero cuando `profileUpdate` tenga `uid`.
    }
  }, [profileUpdate?.uid, dispatch]);

  useEffect(() => {
    if (profileUpdate?.seafarerData && profile?.seafarerData) {
      const fields = compareData(
        profileUpdate.seafarerData,
        profile.seafarerData
      );
      console.log(fields);
    }
  }, [profileUpdate, profile]);

  return <div>ReviewUpdate</div>;
};

export default ReviewUpdate;
