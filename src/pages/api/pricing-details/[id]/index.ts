import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { pricingDetailValidationSchema } from 'validationSchema/pricing-details';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.pricing_detail
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPricingDetailById();
    case 'PUT':
      return updatePricingDetailById();
    case 'DELETE':
      return deletePricingDetailById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPricingDetailById() {
    const data = await prisma.pricing_detail.findFirst(convertQueryToPrismaUtil(req.query, 'pricing_detail'));
    return res.status(200).json(data);
  }

  async function updatePricingDetailById() {
    await pricingDetailValidationSchema.validate(req.body);
    const data = await prisma.pricing_detail.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePricingDetailById() {
    const data = await prisma.pricing_detail.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
