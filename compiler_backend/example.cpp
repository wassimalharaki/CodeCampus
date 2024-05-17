#include <bits/stdc++.h>
using namespace std;

void time() {
    auto start = chrono::high_resolution_clock::now();
    auto end = chrono::high_resolution_clock::now();
    auto duration = chrono::duration_cast<chrono::milliseconds>(end - start).count(); 
    cout << "\n=====" << "\nUsed: " << duration << " ms\n";
}

int main() {
    auto start = chrono::high_resolution_clock::now();
    
    int n; cin >> n;

    vector<int> nums(n);
    iota(nums.begin(), nums.end(), 1);

    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            nums[i] += nums[j];

    auto end = chrono::high_resolution_clock::now();
    auto duration = chrono::duration_cast<chrono::milliseconds>(end - start).count(); 
    cout << "\n=====" << "\nUsed: " << duration << " ms\n";
}