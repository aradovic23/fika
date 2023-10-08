import { createUploadthing, type FileRouter } from 'uploadthing/next-legacy';

import { prisma } from '../server/db';
import { z } from 'zod';
import { getAuth } from '@clerk/nextjs/server';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } }).onUploadComplete(({ file }) => {
    console.log('file url', file.url);
  }),
  productImageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(z.object({ productId: z.string() }))
    .middleware(({ input, req }) => {
      const user = getAuth(req);

      if (!user) {
        throw new Error('You must be logged in to upload a picture');
      }

      return { productId: input.productId };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      const isFileExist = await prisma.picture.findFirst({
        where: {
          key: file.key,
          drinkId: metadata.productId,
        },
      });
      if (isFileExist) return;

      const createdFile = await prisma.picture.create({
        data: {
          key: file.key,
          name: file.name,
          url: file.url,
          drinkId: metadata.productId,
        },
      });

      await prisma.drink.update({
        where: {
          id: metadata.productId,
        },
        data: {
          image: createdFile.url,
          pictureId: createdFile.id,
        },
      });

      console.log('file url', createdFile.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
