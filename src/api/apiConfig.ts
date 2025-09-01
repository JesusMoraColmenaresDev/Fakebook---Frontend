/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { isAxiosError } from "axios";

export const api = axios.create({
	baseURL: "http://localhost:3000",
});