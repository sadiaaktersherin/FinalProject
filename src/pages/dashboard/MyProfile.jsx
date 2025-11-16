import React from "react";
import { auth } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const MyProfile = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in.</p>;

  return (
    <div>
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>
    </div>
  );
};

export default MyProfile;
