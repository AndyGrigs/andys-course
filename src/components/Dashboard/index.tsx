import React from "react";

interface VocabularyItem {
  word: string;
  translation: string;
  _id: string;
}

interface Module {
  text: {
    title: string;
    content: string;
  };
  _id: string;
  name: string;
  moduleGrammar: any[]; // Define this more precisely if possible
  videos: string[];
  vocabulary: VocabularyItem[];
  exercises: string[];
  __v: number;
}

interface DashboardProps {
  module: Module;
}

interface DashboardState {
  progress: number;
}

// You can also define an interface for each subcomponent if needed

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      progress: 0, // Initialize progress, could be dynamic based on user's progress
    };
  }

  renderVocabularyList() {
    return this.props.module.vocabulary.map((item, index) => (
      <li key={item._id}>
        {item.word} - {item.translation}
      </li>
    ));
  }

  renderVideosList() {
    return this.props.module.videos.map((video, index) => (
      <li key={index}>{video}</li>
    ));
  }

  render() {
    const { module } = this.props;
    return (
      <div style={{ paddingLeft: 200 }}>
        <h2>{module.text.title}</h2>
        <p>{module.text.content}</p>
        <h3>Vocabulary</h3>
        <ul>{this.renderVocabularyList()}</ul>
        <h3>Videos</h3>
        <ul>{this.renderVideosList()}</ul>
        {/* Render other module details as needed */}
        <p>Progress: {this.state.progress}%</p>
        {/* Add functionality to update progress */}
      </div>
    );
  }
}

export default Dashboard;
