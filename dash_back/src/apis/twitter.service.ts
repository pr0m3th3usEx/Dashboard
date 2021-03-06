import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FRONT_END_URL,
  TWITTER_BEARER_TOKEN,
  TWITTER_CLIENT_ID,
} from 'src/config';
import axios from 'axios';
import qs from 'qs';

export type OAuthAccessToken = {
  access_token: string;
  refresh_token: string;
  expiresIn: number;
  scope: string;
};

export type Tweet = {
  created_at: Date;
  id: string;
  text: string;
  author_id: string;
};

export type TwitterUser = {
  name: string;
  profile_image_url: string;
  id: string;
  username: string;
};

export type UserTweets = {
  tweets: Tweet[];
  user: TwitterUser;
};

export type TwitterTweets = {
  data: Tweet[];
  includes: {
    users: TwitterUser[];
  };
};
@Injectable()
export class TwitterService {
  private OAUTH_URL = 'https://twitter.com/i/oauth2/authorize';
  private STATE = 'random';
  private instance = axios.create({
    baseURL: 'https://api.twitter.com/2',
    headers: {
      Authorization: 'Bearer ' + TWITTER_BEARER_TOKEN,
    },
  });

  getAuthorizationUrl(): string {
    return `${this.OAUTH_URL}?response_type=code&client_id=${TWITTER_CLIENT_ID}&scope=tweet.read&redirect_uri=${FRONT_END_URL}/oauth_callback&state=${this.STATE}&duration=permanent&code_challenge=challenge&code_challenge_method=plain`;
  }

  async getTokens(query: URLSearchParams): Promise<OAuthAccessToken> {
    if (query.get('state') !== this.STATE) {
      throw new BadRequestException('Invalid response from Twitter');
    }
    try {
      const res = await this.instance.post<OAuthAccessToken>(
        '/oauth2/token',
        qs.stringify({
          method: 'POST',
          code: query.get('code'),
          grant_type: 'authorization_code',
          client_id: TWITTER_CLIENT_ID,
          redirect_uri: `${FRONT_END_URL}/oauth_callback`,
          code_verifier: 'challenge',
        }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async getLastTweetsFromUser(user: string): Promise<UserTweets> {
    try {
      const data = await (
        await this.instance.get<TwitterTweets>(
          `/tweets/search/recent?query=from:${user}&tweet.fields=created_at&expansions=author_id&user.fields=name,profile_image_url&max_results=25`,
        )
      ).data;

      return { tweets: data.data, user: data.includes.users[0] };
    } catch (err) {
      console.log(err);
    }
  }
}
