import React, {Component} from 'react';
import HomeworkItem from './HomeworkItem';

class Homework extends Component {
  render () {
    return (
      <div className="homework-container" style={{textAlign: 'center'}}>
        <HomeworkItem isDone={false}/>
        <HomeworkItem isDone={false}/>
        <HomeworkItem isDone={true}/>
        <HomeworkItem isDone={true}/>

        <HomeworkItem isDone={true}/>

        <HomeworkItem isDone={true}/>

      </div>
    );
  }
}

export default Homework;
