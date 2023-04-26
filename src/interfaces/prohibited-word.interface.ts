import { ObjectId } from "mongodb"

export type PayloadBodyWord = Array<{
    _id: ObjectId
    word: string
    show: number
}>