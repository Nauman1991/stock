import { Type } from '@vendure/common/lib/shared-types';
import { EmailEventHandler } from './event-handler';
import { EventWithContext } from './types';
/**
 * @description
 * An EmailEventListener is used to listen for events and set up a {@link EmailEventHandler} which
 * defines how an email will be generated from this event.
 *
 * @docsCategory EmailPlugin
 */
export declare class EmailEventListener<T extends string> {
    type: T;
    constructor(type: T);
    /**
     * @description
     * Defines the event to listen for.
     */
    on<Event extends EventWithContext>(event: Type<Event>): EmailEventHandler<T, Event>;
}
