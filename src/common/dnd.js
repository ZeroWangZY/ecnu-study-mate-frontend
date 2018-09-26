import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { connect } from 'react-redux'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import './big-calendar.css'
import { refreshSchedule } from '../redux/actions/schedule';

const DragAndDropCalendar = withDragAndDrop(BigCalendar)

class Dnd extends React.Component {
  constructor(props) {
    super(props)
    this.moveEvent = this.moveEvent.bind(this)
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })

    alert(`${event.title} was dropped onto ${event.start}`)
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    alert(`${event.title} was resized to ${start}-${end}`)
  }

  render() {
    return (
      <DragAndDropCalendar
        selectable
        events={this.props.schedule.map((item,index) => ({
          id: item.id,
          title: item.title,
          start: new Date(item.startTime),
          end: new Date(item.endTime),
          resource: item
        }))}
        // onEventDrop={this.moveEvent}
        // resizable
        // onEventResize={this.resizeEvent}
        defaultView="week"
        defaultDate={new Date()}
        onSelectEvent={(event, e) => {
          this.props.openEditDialog(event);
        }}
        tooltipAccessor={(event) => event.resource.content}
      />
    )
  }
}

const mapStateToProps = state => ({
  schedule: state.schedule
})

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(refreshSchedule())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropContext(HTML5Backend)(Dnd))