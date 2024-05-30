import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const prisma = new PrismaClient();

const createIssuesSchema = z.object({
    title: z.string().min(1, "Title is required.").max(255),
    description: z.string().min(1, "Description is required.")
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = createIssuesSchema.safeParse(body);
        console.log('Request Body:', body);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const newIssue = await prisma.issue.create({
            data: { title: body.title, description: body.description }
        });

        console.log('New Issue Created:', newIssue);
        return NextResponse.json(newIssue, { status: 201 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
