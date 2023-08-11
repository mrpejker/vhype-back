export interface LinkMetaData {
  url: string | null;
  title: string | null;
  description: string | null;
  icon: string | null;
  image: string | null;
}

export interface NFTMetaData {
  contract_name: string | null;
  icon: string | null;
  title?: string;
}

export interface LinkData {
  title: string | null;
  url: string | null;
  meta?: LinkMetaData | NFTMetaData;
}

export interface vRandaProfile {
  avatar_url: string;
  name: string;
  bio: string;
  links: {};
  subscriptions?: { [key: string]: string };
  nfts: {};
}

export interface VSelfProfile {
  [key: string]: {
    vself: vRandaProfile;
  };
}

export interface vRandaFormState extends vRandaProfile {
  avatar: string;
  file: File | null;
}

export interface NFTRewardData {
  token_id: string;
  owner_id: string;
  metadata: {
    title: string;
    description: string;
    media: string;
    media_hash: string;
    copies: number;
    issued_at: string;
    expires_at: string | null;
    starts_at: string | null;
    updated_at: string | null;
    extra: string;
    reference: string | null;
    reference_hash: string;
  };
  approved_account_ids: Record<string, unknown>;
}
