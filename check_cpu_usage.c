#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER_SIZE 256

int main()
{
    FILE *file = fopen("/proc/stat", "r");
    if (file == NULL)
    {
        perror("Error opening /proc/stat");
        return 1;
    }

    char line[BUFFER_SIZE];
    fgets(line, sizeof(line), file);
    unsigned long long user, nice, system, idle;  //user: time spent in user mode, nice: time spent in niced (low priority) user processes, system: time spent in kernel mode, idle: time spent in idle state
    sscanf(line + 5, "%llu %llu %llu %llu", &user, &nice, &system, &idle);

    unsigned long long total_cpu_time = user + nice + system + idle;
    double total_cpu_usage = (double) (total_cpu_time - idle) / total_cpu_time * 100;
    printf("Total CPU Usage: %lf%%\n", total_cpu_usage);
    fclose(file);

    return 0;
}