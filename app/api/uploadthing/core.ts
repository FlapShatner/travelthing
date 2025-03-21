import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { getServerSession } from '@/server/auth-actions';
import { MAX_FILE_SIZE } from '@/data/constants';

const f = createUploadthing();

const maxFileSize = `${MAX_FILE_SIZE / 1024 / 1024}MB`;

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profilePicture: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: maxFileSize,
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const session = await getServerSession();
      const user = session?.user;

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),
  headerImage: f({
    image: {
      maxFileSize: maxFileSize,
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await getServerSession();
      const user = session?.user;
      if (!user) throw new UploadThingError('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('file url', file.ufsUrl);
      return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
