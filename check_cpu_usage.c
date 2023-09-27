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
    printf("Line: %s\n", line);

    fclose(file);

    return 0;
}