/*
 这里实现的list 在顶部添加了一个 sentinel node 
 为了在删除 list中的第一个元素的时候，不影响外部的使用
*/

#include "include/common.h"
#include "include/list.h"  //相对的路径,尽量不要写 ../** or ./**
#include <stdio.h>
#include <stdlib.h>

struct Node {
    ElementType Element;
    Position Next;
};

// 创建一个List
List MakeList(List L)
{
    List Head = (List)malloc( sizeof(struct Node) );
    if(Head == NULL){
        // memory error
        FatalError( "Out of space!!!" );
    }
    if(Head != NULL){
        L = Head;
    }
    return Head;
    // return L == NULL ? Head : L = Head; // 感觉这样写也可以
}

int IsEmpty( List L )
{
    return L -> Next == NULL;
}
/*
    return true if P is the last position in list L
    parameter L is unused in this implementation
    ?? what if P is not in L
*/
int IsLast( Position P, List L )
{
    return P->Next == NULL;
}

// Return Position of X in L;
// NULL if not found
Position Find( ElementType X, List L )
{
    Position First;
    First = L->Next;
    while(!First && First->Element != X)
        First = First->Next;
    return First;
}

/**
 delete first occurrence of X from list L
 assume use of a header node
*/
// _M 说明是我自己的实现，不是书中的实现
void Delete_M( Position P, List L )
{
    Position Cur = L;
    Position Pre = L->Next;
    while(!Cur && Cur->Element != P->Element)
        Pre = Cur;
        Cur = Cur->Next;
    if(!Cur) return; //do not in list
    Pre->Next = Cur->Next;
    free(Cur); // 因为我们的每个Node都是用 malloc 动态分配的
    //we should do something to clean the deleted element eg. Cur.destory();
}

void Delete( ElementType X, List L) 
{
    Position P;
    Position TmpCell;
    P = FindPrevious( X, L );
    // 如果是最后一个，说明 X 在 L 中不存在
    if( !IsLast( P, L ) )
    {
        TmpCell = P->Next;
        P->Next = TmpCell->Next;
        free(TmpCell);
    }
}

Position FindPrevious( ElementType X, List L )
{
    Position P;
    P = L;
    if(P->Next != NULL && P->Next->Element != X )
        P = P->Next;
    return P; //如果 X在L中不存在， 就返回最后一个元素
}

// 这里假定 P 是一个合法的位置；
void Insert( ElementType X, List L, Position P )
{
    Position TmpCell;
    TmpCell = malloc( sizeof( struct Node ) );
    if( !TmpCell )
        FatalError( "Out of space!!!" );
    TmpCell->Next = P->Next;
    TmpCell->Element = X;
    P->Next = TmpCell;
}

//删除一个List
void DeleteList( List L )
{
    Position P;
    Position Tmp;
    P = L->Next;
    L->Next = NULL;
    while(P != NULL)
    {
        Tmp = P->Next;
        free(P);
        P = Tmp;
    }
}




