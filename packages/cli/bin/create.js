#!/usr/bin/env node
import mainEntry from '../index.js';
try {
    mainEntry()
} catch (e) {
    console.error(e)
}