#include "include/common.h"

void FatalError( char* sErr)
{
    // 我也不知道如何实现，暂时就把错误信息打印到标准错误中去.
    fprintf(2, "\n\n%s\n\n", sErr);
    return (void)0;
}
