import "./NowPlaying.css";

const NowPlaying = (props) => {
  const trackPlay = props.trackPlayList.map((track, idx) => {
    return (
      <>
        <div key={idx} className="trackPlayListCont">
          <p>Title: {track.title}</p>
          <p>Artist: {track.artist}</p>
        </div>
      </>
    );
  });

  return (
    <div>
      <h2>NowPlaying List</h2>
      {!props.trackPlayList.length ? (
        <h2>No Play Tracks Yet!</h2>
      ) : (
        <ul>{trackPlay}</ul>
      )}
    </div>
  );
};

export default NowPlaying;
