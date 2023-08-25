const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const questionSeeder = async () => {
  const hasQuestions = await prisma.questions.count();
  if (hasQuestions <= 0) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE questions`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE options`);

    await prisma.questions.create({
      data: {
        question:
          "Are you an attorney in good standing with all relevant bar associations, including the Oregon State Bar or a state bar within the United States, and registered to practice before the immigration courts?This question is required.",
        status: true,
        options: {
          create: [
            { option: "Yes", status: true},
            { option: "No", status: false },
          ],
        },
      },
    });

    await prisma.questions.create({
      data: {
        question:
          "Are you covered and can demonstrate coverage of malpractice insurance covering at least $300,000 per claim through the Professional Liability Fund (PLF) or another similar malpractice insurance?This question is required.",
        status: true,
        options: {
          create: [
            { option: "Yes", status: true},
            { option: "No", status: false },
          ],
        },
      },
    });

    await prisma.questions.create({
      data: {
        question:
          "Have you practiced immigration law for at least five years before the immigration authorities or are you working under supervision of attorney with at least 5 years of experience?This question is required.",
        status: true,
        options: {
          create: [
            { option: "Yes", status: true},
            { option: "No", status: false },
          ],
        },
      },
    });

    await prisma.questions.create({
      data: {
        question:
          "Do you have experience or demonstrated ability to communicate with and advocate for immigrants from different cultures?",
        status: true,
        options: {
          create: [
            { option: "Yes", status: true},
            { option: "No", status: false },
          ],
        },
      },
    });

    await prisma.questions.create({
      data: {
        question:
          "Do you have experience practicing before the immigration courts?",
        status: true,
        options: {
          create: [
            { option: "Yes", status: true},
            { option: "No", status: false },
          ],
        },
      },
    });

    await prisma.questions.create({
      data: {
        question:
          "Do you have experience in master hearings, motions practice, and merits hearings before the immigration court?This question is required.",
        status: true,
        options: {
          create: [
            { option: "Yes", status: true},
            { option: "No", status: false },
          ],
        },
      },
    });

    await prisma.questions.create({
      data: {
        question:
          "Do you have access to and regularly use legal research databases, and can you prepare and present written and oral arguments on behalf of immigrants beyond the filing of generic or canned briefs and the making of routine arguments?This question is required.",
        status: true,
        options: {
          create: [
            { option: "Yes", status: true},
            { option: "No", status: false },
          ],
        },
      },
    });

    await prisma.questions.create({
      data: {
        question:
          "Do you possess good moral and ethical character and have you demonstrated professional demeanor with the immigration courts, the immigration bar, and the legal profession in general?",
        status: true,
        options: {
          create: [
            { option: "Yes", status: true},
            { option: "No", status: false },
          ],
        },
      },
    });
  }else{
    console.log('Question seeder is not executed, because questions table is not empty.');
  }
};

module.exports = questionSeeder;
