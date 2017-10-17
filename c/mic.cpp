#include <map>
#include <set>
#include <list>
#include <cmath>
#include <ctime>
#include <deque>
#include <queue>
#include <stack>
#include <string>
#include <bitset>
#include <cstdio>
#include <limits>
#include <vector>
#include <climits>
#include <cstring>
#include <cstdlib>
#include <fstream>
#include <numeric>
#include <sstream>
#include <iostream>
#include <algorithm>
#include <unordered_map>

using namespace std;

vector<int> array_left_rotation(vector<int> a, int n, int k) {
    // tail case
    if(k == 0) return a;
    // else, rotate once with k - 1
    int temp = 0; // temp to hold head value for rotation
    // rotate
    for(int a_i = 0; a_i < n; a_i++) {
        //head case
        if(a_i == 0) temp = a[a_i];
        // tail case
        else if(a_i == n - 1) a[a_i] = temp;
        //normal case
        else a[a_i] = a[a_i + 1];
    }

    for(int i = 0; i < n; i++)
        cout << a[i] << " ";
    cout << endl;

    return array_left_rotation(a, n, k - 1);
}

int main(){
    int n;
    int k;
    cin >> n >> k;
    vector<int> a(n);
    for(int a_i = 0;a_i < n;a_i++){
        cin >> a[a_i];
    }
    vector<int> output = array_left_rotation(a, n, k);
    for(int i = 0; i < n;i++)
        cout << output[i] << " ";
    cout << endl;
    return 0;
}
