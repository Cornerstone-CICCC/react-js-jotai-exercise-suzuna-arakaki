import { atom } from "jotai";

export const HOBBIES_LIST = ["swiming", "soccer", "basketball"];

export type Hobby = (typeof HOBBIES_LIST)[number];

interface User {
  firstname: string;
  lastname: string;
  age: number;
  hobbies: string[];
}
export const usersAtom = atom<User[]>([]);

export const firstnameAtom = atom<string>("");
export const lastnameAtom = atom<string>("");
export const ageAtom = atom<string>("");
export const hobbiesAtom = atom<Hobby[]>([]);
