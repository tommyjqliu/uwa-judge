
import { CONTEST_CID, CONTEST_SETTING } from '@/lib/constant';
import { domjudgeDB, uwajudgeDB } from '@/lib/database-client';
import { readProblems } from '@/tests/utils/read-problems';
import { createProblems } from '@/lib/services/problem-service';
import bcrypt from 'bcrypt';
import { readEnvs } from '@/lib/utils';

readEnvs()

async function main() {
    // Initial setup
    await domjudgeDB.user.upsert({
        where: { username: "admin" },
        update: { username: "admin", name: "Administrator", password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10), teamid: 1 },
        create: { username: "admin", name: "Administrator", password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10), teamid: 1 },
    })
    await domjudgeDB.user.upsert({
        where: { username: "judgehost" },
        update: { username: "judgehost", name: "judgehost", password: await bcrypt.hash(process.env.JUDGEDAEMON_PASSWORD, 10) },
        create: { username: "judgehost", name: "judgehost", password: await bcrypt.hash(process.env.JUDGEDAEMON_PASSWORD, 10) },
    })

    await domjudgeDB.contest.upsert({
        where: { cid: CONTEST_CID },
        update: CONTEST_SETTING,
        create: CONTEST_SETTING,
    })

    await domjudgeDB.language.update({
        where: { langid: 'py3' },
        data: {
            externalid: "python"
        }
    })

    // Insert test data
    const usersToInsert = Array.from({ length: 20 }, (_, i) => {
        const username = `user${i + 1}`;
        return {
            username,
            password: username,
        };
    });

    await uwajudgeDB.user.createMany({
        data: usersToInsert,
        skipDuplicates: true,
    })

    const problems = await readProblems()

    for (let i = 1; i <= 5; i++) {
        const title = `Assignment ${i}`;
        const description = `Assignment ${i} description`;
        const assignment = await uwajudgeDB.assignment.create({
            data: {
                title,
                description,
                publishDate: new Date(),
                dueDate: new Date(),
            }
        })
        await createProblems(problems, assignment.id)

    }

    const studentUserIds = [7, 8, 9, 10, 11, 12, 13];
  const tutorUserIds = [4, 5, 6];
  const adminUserIds = [1, 2, 3];
  
  for (let assignmentId = 1; assignmentId <= 5; assignmentId++) {
    for (let studentUserId of studentUserIds) {
      await uwajudgeDB.studentsOnAssignments.create({
        data: {
          assignmentId: assignmentId,
          userId: studentUserId,
        },
      });
    }
    

    for (let tutorUserId of tutorUserIds) {
      await uwajudgeDB.tutorsOnAssignments.create({
        data: {
          assignmentId: assignmentId,
          userId: tutorUserId,
        },
      });
    }
    
    
    for (let adminUserId of adminUserIds) {
      await uwajudgeDB.adminsOnAssignments.create({
        data: {
          assignmentId: assignmentId,
          userId: adminUserId,
        },
      });
    }
  }

  const userIds = [7, 8, 9, 10, 11, 12, 13];

  
  for (let assignmentId = 1; assignmentId <= 5; assignmentId++) {
    
    const problems = await uwajudgeDB.problemsOnAssignments.findMany({
      where: {
        assignmentId: assignmentId,
      },
      include: {
        problem: true,
      },
    });

    for (let problem of problems) {
      for (let userId of userIds) {
        await uwajudgeDB.submission.create({
          data: {
            id: `${assignmentId}-${problem.problemId}-${userId}`,  
            submissionDate: new Date(),
            assignmentId: assignmentId,
            problemId: problem.problemId,
            userId: userId,
            comment: `Submission from user ${userId} for assignment ${assignmentId} and problem ${problem.problemId}`,
            mark: null,  
          },
        });
      }
    }
  }
  const studentUserIds1 = [7, 8, 9];
  const studentUserIds2 = [10, 11];
  const studentUserIds3 = [12, 13];
  const group1 = await uwajudgeDB.userGroup.create({ data: { name: 'Group 1', description: 'Group for users 7, 8, 9' } });
  const group2 = await uwajudgeDB.userGroup.create({ data: { name: 'Group 2', description: 'Group for users 10, 11' } });
  const group3 = await uwajudgeDB.userGroup.create({ data: { name: 'Group 3', description: 'Group for users 12, 13' } });

  for (let userId of studentUserIds1) {
    await uwajudgeDB.usersOnGroups.create({
      data: {
        userId: userId,
        groupId: group1.id,
        isAdmin: false,  
      }
    });
  }

 
  for (let userId of studentUserIds2) {
    await uwajudgeDB.usersOnGroups.create({
      data: {
        userId: userId,
        groupId: group2.id,
        isAdmin: false,  
      }
    });
  }

  
  for (let userId of studentUserIds3) {
    await uwajudgeDB.usersOnGroups.create({
      data: {
        userId: userId,
        groupId: group3.id,
        isAdmin: false, 
      }
    });
  }

  
  await uwajudgeDB.usersOnGroups.create({
    data: {
      userId: tutorUserIds[0],
      groupId: group1.id,
      isAdmin: true,  
    }
  });

  await uwajudgeDB.usersOnGroups.create({
    data: {
      userId: tutorUserIds[1],
      groupId: group2.id,
      isAdmin: true,  
    }
  });

  await uwajudgeDB.usersOnGroups.create({
    data: {
      userId: tutorUserIds[2],
      groupId: group3.id,
      isAdmin: true, 
    }
  });


  for (let adminUserId of adminUserIds) {
    await uwajudgeDB.usersOnGroups.create({
      data: {
        userId: adminUserId,
        groupId: group1.id,
        isAdmin: true,  
      }
    });
    await uwajudgeDB.usersOnGroups.create({
      data: {
        userId: adminUserId,
        groupId: group2.id,
        isAdmin: true,  
      }
    });
    await uwajudgeDB.usersOnGroups.create({
      data: {
        userId: adminUserId,
        groupId: group3.id,
        isAdmin: true,  
      }
    });
  }


}


main()
    .then(async () => {
        await Promise.all([
            domjudgeDB.$disconnect(),
            uwajudgeDB.$disconnect(),
        ])
    })
    .catch(async (e) => {
        console.error(e)
        await Promise.all([
            domjudgeDB.$disconnect(),
            uwajudgeDB.$disconnect(),
        ])
        process.exit(1)
    })