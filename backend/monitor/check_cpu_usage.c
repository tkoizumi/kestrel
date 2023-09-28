#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER_SIZE 256

double get_usage()
{
    FILE *file = fopen("/proc/stat", "r");
    if (file == NULL) {
        perror("Error opening /proc/stat");
        return 1;
    }

    char line[256];
    if (fgets(line, sizeof(line), file)) {
        if (strncmp(line, "cpu ", 4) == 0) {
            unsigned long long user, nice, system, idle;
            sscanf(line + 5, "%llu %llu %llu %llu", &user, &nice, &system, &idle);

            unsigned long long total_cpu_time = user + nice + system + idle;
            printf("%lf", (double)(total_cpu_time - idle) / total_cpu_time * 100.0);
        }
    }

    fclose(file);
    // Now, let's list individual process CPU usage
    file = fopen("/proc/stat", "r");
    if (file == NULL) {
        perror("Error opening /proc/stat");
        return 1;
    }

    while (fgets(line, sizeof(line), file)) {
        int pid;
        char comm[256];
        unsigned long long user_time, nice_time, system_time, idle_time;
        if (sscanf(line, "cpu %d %s %llu %llu %llu %llu", &pid, comm, &user_time, &nice_time, &system_time, &idle_time) == 6) {
            unsigned long long total_cpu_time_p = user_time + nice_time + system_time + idle_time;
            unsigned long long cpu_usage_p = (total_cpu_time_p - idle_time) / total_cpu_time_p * 100;
            printf("**%d,%s,%llu,%llu,%llu", pid, comm, user_time,nice_time,system_time); 
        }
    }

    fclose(file);
    return 0;
}

int main()
{
    get_usage();
    return 0;

}