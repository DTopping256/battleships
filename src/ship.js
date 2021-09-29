"use strict";
import { castTo } from "./utils.js";

export class Ship {
    [Symbol.toStringTag] = 'Ship';
    get Name() { return this._Name; }
    get Start() { return this._Start; }
    get End() { return this._End; }

    constructor(name, start, end) {
        this._Name = name;
        this._Start = start;
        this._End = end;
    }

    static _Caster = castTo(Ship);
    static Cast(o) { return Ship._Caster(o); }
}