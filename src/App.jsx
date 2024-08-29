import { useEffect, useState } from "react";

import TrackList from "./components/TrackList/TrackList";
import TrackForm from "./components/TrackForm/TrackForm";
import NowPlaying from "./components/NowPlaying/NowPlaying";

import * as trackService from "./components/services/trackService";

import "./App.css";

const App = () => {
  const [trackList, setTrackList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [trackPlayList, setTrackPlayList] = useState([]);
  const [showComponent, setShowComponent] = useState(false);

  const updateSelected = (track) => {
    setSelected(track);
  };

  const handleFormView = (track) => {
    if (!track.name) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
      setTrackList([newTrack, ...trackList]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.updateTrack(formData, trackId);
      const updatedTrackList = trackList.map((track) =>
        track._id !== updatedTrack._id ? track : updatedTrack
      );
      setTrackList(updatedTrackList);
      setSelected(updatedTrack);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId);
      setTrackList(trackList.filter((track) => track._id !== deletedTrack._id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTrackPlay = async (formData) => {
    try {
      const newTrack = await trackService.createPlay(formData);
      setTrackPlayList([newTrack, ...trackPlayList]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await trackService.index();
        setTrackList(data);
        setTrackPlayList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTracks();
  }, []);

  function deriveButtonText() {
    if (showComponent) {
      setShowComponent(false);
    } else {
      setShowComponent(true);
    }
  }

  return (
    <main>
      <div>
        <button onClick={deriveButtonText}>Add</button>
        {showComponent && (
          <TrackForm
            handleAddTrack={handleAddTrack}
            handleUpdateTrack={handleUpdateTrack}
            selected={selected}
          />
        )}
      </div>
      <div className="trackListCont">
        <TrackList
          trackList={trackList}
          updateSelected={updateSelected}
          handleFormView={handleFormView}
          isFormOpen={isFormOpen}
          handleRemoveTrack={handleRemoveTrack}
          selected={selected}
          handleAddTrackPlay={handleAddTrackPlay}
        />
      </div>
      <div>
        <NowPlaying trackPlayList={trackPlayList} />
      </div>
    </main>
  );
};

export default App;
