const { request, response } = require("express");

const EventModel = require("../models/Event");

class Event {
  async getEvents(req = request, res = response) {
    const events = await EventModel.find().populate('user', 'name')

    res.status(200).json({
      ok: true,
      events,
    });
  }

  async createEvent(req = request, res = response) {
    const _event = new EventModel(req.body);
    try {
      _event.user = req.uid;
      const savedEvent = await _event.save();
      res.status(200).json({
        ok: false,
        message: "Task created successfully",
        task: savedEvent
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Talk to the administrator",
      });
    }
  }

  async updateEvent(req = request, res = response) {
    const { id } = req.params;

    try {
      const _event = await EventModel.findById(id);

      if (!_event) {
        return res.status(404).json({
          ok: false,
          message: `Event with id ${id} not found`
        });
      }

      if (_event.user.toString() !== req.uid) {
        return res.status(401).json({
          ok: false,
          message: 'Unnauthorized user access requested'
        })
      }

      const newEvent = {
        ...req.body,
        user: req.uid,
      };
      const updatedEvent = await EventModel.findByIdAndUpdate(
        id,
        newEvent,
        { new: true }
      );
      
      res.status(200).json({
        ok: true,
        message: "Event updated successfully",
        events: updatedEvent
      });

    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Talk to the administrator",
      });
    }

  }

  async deleteEvent(req = request, res = response) {
    const { id } = req.params;

    try {
      const _event = await EventModel.findById(id);
      
      if (!_event) {
        return res.status(404).json({
          ok: false,
          message: `Event with ${id} not found`,
        });
      }

      if (_event.user.toString() !== req.uid) {
        return res.status(404).json({
          ok: false,
          message: 'Unnauthorized request. Cannot remove this event',
        });
      }

      await EventModel.findByIdAndRemove(id);
      res.status(201).json({
        ok: true,
        message: "Event removed successfully",
      });

    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Talk to the administrator",
      });  
    }
  }
}

module.exports = {
  Event,
};
