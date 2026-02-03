import { Injectable } from '@nestjs/common';
import { CreateTasknestDto } from './dto/create-tasknest.dto';

@Injectable()
export class TasknestService {
  create(createTasknestDto: CreateTasknestDto) {
    try {
      let totalEmployee = 0;
      let totalSalary = 0;
      let maxDepth = 0;

      function getDepth(subordinates: any[]) {
        if (!subordinates || subordinates.length === 0) return;

        subordinates.forEach((sub) => {
          totalEmployee++;
          totalSalary += sub.salary;
          maxDepth++;

          if (sub.subordinates && sub.subordinates.length > 0) {
            getDepth(sub.subordinates);
          }
        });
      }

      totalEmployee++;
      totalSalary += createTasknestDto.salary;

      getDepth(createTasknestDto.subordinates);

      // createTasknestDto.subordinates.map((sub) => {
      //   totalEmployee++;
      //   totalSalary += sub.salary;
      //   max_length++;
      //   sub.subordinates.map((subs) => {
      //     console.log('subs', subs);
      //     totalEmployee++;
      //     totalSalary += subs.salary;
      //     max_length++;
      //     subs.subordinates.map((subss) => {
      //       console.log('subss', subss);
      //       totalEmployee++;
      //       totalSalary += subss.salary;
      //       max_length++;
      //       console.log(subss.subordinates.length === 0);
      //     });
      //   });
      // });

      // while (createTasknestDto.subordinates) {
      //   createTasknestDto.subordinates.map((sub) => {
      //     totalEmployee++;
      //     totalSalary += sub.salary;
      //     max_length++;
      //   });
      //   if (createTasknestDto.subordinates[0] === undefined) {
      //     return { totalEmployee, totalSalary, max_length };
      //   }
      // }

      return { totalEmployee, totalSalary, maxDepth };
    } catch (err) {
      console.log(err);
    }
    return 'This action adds a new tasknest';
  }
}
