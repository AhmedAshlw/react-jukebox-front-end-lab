import { useState } from "react";

const TrackForm = (props) => {
  const initialState = {
    title: "",
    artist: "",
  };

  const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  );

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.selected) {
      props.handleUpdateTrack(formData, props.selected._id);
    } else {
      props.handleAddTrack(formData);
    }
    setFormData(initialState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="artist">Artist: </label>
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">
            {props.selected ? "Update Track" : "Add New Track"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrackForm;
