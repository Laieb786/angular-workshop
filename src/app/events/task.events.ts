import { event } from "@ngrx/signals/events";
import { eventGroup } from "@ngrx/signals/events";

export const taskEvents = eventGroup({
    source: 'task',
    events: {
        taskAdded: event('taskAdded'),
        taskDeleted: event('taskDeleted')
    }
})
export const apiDataReceived = event('apiDataReceived');