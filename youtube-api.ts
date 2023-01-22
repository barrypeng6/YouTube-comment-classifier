import { google } from 'googleapis'
const youtube = google.youtube('v3');

const getTextDispaly = (commentThreadsItem): string => {
  return commentThreadsItem?.snippet.topLevelComment.snippet.textDisplay
}

const getComments = async (videoId: string) => {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/youtube.force-ssl'],
  });
  const authClient = await auth.getClient();
  google.options({auth: authClient});

  const res = await youtube.commentThreads.list({
    part: ['snippet'],
    videoId: videoId,
  });

  const allComments = res.data.items?.map(item => getTextDispaly(item))
  return allComments?.slice(0, 10)
}

export { getComments }

