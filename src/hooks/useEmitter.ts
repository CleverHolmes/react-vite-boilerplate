import { useEffect, useState } from "react";

export class Emitter<T> {
    public data: T;
    public listners: Record<number, (data) => void> = {};

    constructor(data: T) {
        this.data = data;
    }

    emit(newData: T) {
        this.data = newData;
        this.sendCallback();
    }

    subscribe(callbackFn: (data) => void) {
        const uniqId = new Date().getTime().toString() + "-" + Math.random().toString();
        this.listners[uniqId] = callbackFn;

        return {
            unsubscribe: () => {
                delete this.listners[uniqId];
            }
        }
    }

    sendCallback() {
        for (const key in this.listners) {
            this.listners[key](this.data);
        }
    }
}

export function useEmitter<T>(emitter: Emitter<T>) {
    const [data, setData] = useState(emitter.data);
    useEffect(() => {
        const subscription = emitter.subscribe((newData) => setData(newData))

        return () => {
            subscription.unsubscribe();
        }
    }, [emitter]);

    return data;
}