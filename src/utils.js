"use strict";
export function castTo(targetClassCtor) {
    return function (o) {
        if (!o || typeof(o) != 'object')
            throw new TypeError(`The given "o" argument cannot be cast to a(/an) ${targetClassCtor.name}.`);

        return Object.assign(new targetClassCtor(), o);
    }
}