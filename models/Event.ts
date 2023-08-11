export interface Quest {
  qr_prefix: string;
  qr_prefix_len: number;
  reward_description: string;
  reward_title: string;
  reward_uri: string;
}

export interface CollectionData {
  event_description: string;
  event_name: string;
  finish_time: number;
  quests: Quest[];
  start_time: number;
}

export interface CollectionFormData extends CollectionData {
  files: File[];
}

export interface CollectionStats {
  stopped_at: number | null;
  participants: string[];
  created_at: number;
  created_by: string;
  total_actions: number;
  total_rewards: number;
  total_users: number;
}

export interface EventAction {
  username: string;
  qr_string: string;
  timestamp: number;
  reward_index: number;
}

export interface CollectionSettings {
  signin_request: boolean;
  transferability: boolean;
  limited_collection: boolean;
}

export interface Collection {
  0: number;
  1: CollectionData;
  2: CollectionSettings;
  3: CollectionStats;
}
