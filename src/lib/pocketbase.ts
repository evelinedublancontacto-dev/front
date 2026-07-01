"use client";
import PocketBase from 'pocketbase';

const PB_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://eveline-dublan.pockethost.io';

const pb = new PocketBase(PB_URL);

pb.autoCancellation(false);

export default pb;
