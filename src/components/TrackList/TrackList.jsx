const TrackList = (props) => {
  const tracks = props.trackList.map((track, idx) => {
    return (
      <a key={idx} onClick={() => props.updateSelected(track)}>
        <li>{track.title}</li>
        <li>{track.artist}</li>
        <button
          onClick={() => {
            props.handleAddTrackPlay(props.selected);
          }}
        >
          Play
        </button>
        <button
          onClick={() => {
            props.handleFormView(props.selected);
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            props.handleRemoveTrack(props.selected._id);
          }}
        >
          Delete
        </button>
      </a>
    );
  });

  return (
    <div>
      <h2>Track List</h2>
      {!props.trackList.length ? <h2>No Tracks Yet!</h2> : <ul>{tracks}</ul>}
    </div>
  );
};

export default TrackList;
