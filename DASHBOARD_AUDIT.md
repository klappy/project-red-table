# Dashboard Numbers Audit Report

## Summary
The dashboard accurately calculates its numbers, but several presentation choices could confuse viewers unfamiliar with the data structure and goals.

## Key Findings

### ✅ What's Accurate
- **1,788 languages at risk** - Correctly excludes portions and "Goal Met via second language"
- **48.2% languages completed** (2,845 of 5,905) 
- **Goal-specific percentages** are mathematically correct:
  - Full Bible: 56.3% (358 of 636 with FB/Two FB goals)
  - New Testament: 53.1% (2,028 of 3,816 with NT/FB/Two FB goals)
  - Portions: 39.1% (817 of 2,089 with portion goals)

### ⚠️ Potential Confusion Points

#### 1. **Overlapping Goal Categories**
**Issue**: The footer shows NT progress including FB languages, and FB progress including Two FB languages.

**Why it's confusing**: 
- Viewers might think these are independent goals
- NT showing 53.1% includes languages with FB goals (which is correct, as FB contains NT)
- Not immediately obvious that achieving FB also achieves NT

**Example**: A language with a Full Bible goal that's complete counts toward BOTH the NT percentage (53.1%) and FB percentage (56.3%).

#### 2. **Different Percentage Bases**
**Issue**: Summary stats show 48.2% "Languages Completed" but footer shows different percentages.

**Why it's confusing**:
- Summary: 48.2% = 2,845 completed / 5,905 total languages
- Footer FB: 56.3% = 358 completed / 636 languages with FB goals
- Footer NT: 53.1% = 2,028 completed / 3,816 languages with NT+ goals
- These use different denominators!

#### 3. **At-Risk vs Remaining**
**Issue**: Three different "incomplete" numbers appear:
- Languages Remaining: 3,060
- Languages At Risk: 1,788
- The invisible middle: 1,272 languages ON TRACK but not complete

**Why it's confusing**: 
- "Remaining" suggests all need urgent attention
- But 1,272 languages are actually progressing well
- Dashboard doesn't show this "on track" category explicitly

#### 4. **Language Count vs Population Percentage**
**Issue**: All Access Goals target population percentages (95%, 99.96%, 100%) but dashboard shows language counts.

**Why it's confusing**:
- Seeing "53.1%" for NT might suggest we're halfway to the 99.96% population goal
- But this is 53.1% of LANGUAGES, not POPULATION
- Languages vary wildly in speaker population (10M vs 10K speakers)

#### 5. **Goal Hierarchy Not Clear**
**Issue**: The relationship between Portions < NT < FB < Two FB isn't visually obvious.

**Why it's confusing**:
- Appears as four separate goals rather than increasing levels
- FB contains NT, but they're shown as separate progress bars
- Could seem like we need to complete NT AND FB separately

## Recommendations

### Quick Fixes (Text Changes)
1. **Clarify overlapping categories** in footer:
   - Change "New Testament" to "NT or Higher"
   - Change "Full Bible" to "Full Bible or Higher"
   
2. **Add context to percentages**:
   - Add note: "Percentages show language counts, not population coverage"
   
3. **Explicitly show "On Track" category**:
   - Add to summary stats: "1,272 On Track (in progress, expected to complete)"

### Visual Improvements
1. **Show goal hierarchy**:
   - Use nested or stacked visualization
   - Or add arrows: Portions → NT → FB → Two FB
   
2. **Separate population goals from language progress**:
   - Add section showing estimated population coverage
   - Or clearly label: "Language Progress (not population %)"

### Data Clarity
1. **Add tooltips or info buttons** explaining:
   - What "at risk" means vs "remaining"
   - How categories overlap
   - Difference between language and population metrics

2. **Consider showing exclusive categories**:
   - "Portions only: X"
   - "NT only: Y" 
   - "FB (including Two FB): Z"
   - Makes the math more transparent

## Bottom Line
The numbers are **technically correct** but the **presentation could mislead** viewers about:
- How close we are to population goals
- Which languages need urgent attention
- How the different scripture goals relate

The main risk is that viewers might think we're much further behind than we actually are, especially on population coverage.
