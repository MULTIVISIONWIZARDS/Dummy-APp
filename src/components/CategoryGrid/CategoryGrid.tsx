// CategoryGrid.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/Colors';

// const DATA = [
//   {
//     id: "1",
//     title: "Diet",
//     icon: "food-apple",
//     color: "#34d399ff",
//     description: "Balanced nutrition fuels your energy and overall health.",
//     detailedContent: `
//  Diet: The Foundation of Health

// A diet refers to the variety and quantity of food that a person consumes on a daily basis. Nutrition is one of the cornerstones of good health, yet it is often overlooked in a fast-paced, modern lifestyle. What you eat directly influences your physical health, energy, mood, immunity, and even your risk of developing chronic diseases.

// ---

//  Why Diet Matters
// - Provides the fuel for everyday activity and brain function.
// - Supplies the body with macronutrients: carbohydrates, proteins, and fats.
// - Delivers essential micronutrients like vitamins, minerals, and antioxidants.
// - Helps regulate hormones, weight, and metabolism.
// - Plays a key role in preventing lifestyle-related diseases like diabetes, obesity, and heart disease.

// ---

//  Types of Diet Approaches
// 1. Balanced Diet – Includes a variety of foods from all food groups in appropriate proportions. Often recommended by doctors and nutritionists as the gold standard.
// 2. Vegetarian Diet – Excludes meat, may include dairy and eggs. Rich in fiber and antioxidants.
// 3. Vegan Diet– Strictly plant-based. Eliminates all animal products and requires careful planning to avoid deficiencies.
// 4. Ketogenic Diet – Low carbohydrate, high fat. Used for weight loss and managing certain medical conditions.
// 5. Mediterranean Diet – Emphasizes olive oil, fish, nuts, fruits, vegetables, and whole grains. Linked to longevity and heart health.
// 6. Intermittent Fasting – Focuses more on *when* you eat rather than *what* you eat. Known to help with insulin sensitivity and fat loss.

// ---

//  Benefits of a Healthy Diet
// - Higher energy levels throughout the day.
// - Stronger immunity and faster recovery from illness.
// - Improved mental clarity and focus.
// - Better skin, hair, and overall appearance.
// - Reduced risk of chronic illnesses like cancer, heart disease, and diabetes.
// - Supports healthy aging and longevity.

// ---

//  Risks of an Unhealthy Diet
// - Nutrient deficiencies (iron, vitamin D, B12, calcium).
// - Obesity and related complications such as high blood pressure.
// - Mood disturbances and higher risk of anxiety/depression.
// - Increased inflammation and risk of metabolic syndrome.
// - Weaker immune system, leading to frequent illness.

// ---

//  Practical Tips for Everyday Nutrition
// - Fill half your plate with vegetables and fruits.
// - Choose whole grains over refined grains (brown rice, quinoa, oats).
// - Stay hydrated: aim for at least 2–3 liters of water daily.
// - Limit added sugars, processed foods, and trans fats.
// - Practice mindful eating: chew slowly and eat without distractions.
// - Plan meals ahead to avoid unhealthy snacking.

// ---

//  Fun Facts
// - The word “diet” originally comes from the Greek word *diaita*, meaning “way of living.”
// - Eating a rainbow of colors in fruits and vegetables ensures a wide range of nutrients.
// - Dark chocolate (70% and above) can actually improve heart health when consumed moderately!

// ---

//  Final Thoughts
// Your diet is not just about weight management —it is about fueling your body and mind for a productive, healthy, and happy life. Every meal is an opportunity to nourish yourself. Small, consistent changes in your eating habits can create a lifelong impact.

// Remember: You don’t need a perfect diet; you just need a sustainable one.
//     `,
//   },

//   {
//     id: "2",
//     title: "Exercise",
//     icon: "dumbbell",
//     color: "#3b82f6ff",
//     description: "Regular movement improves strength, mood, and longevity.",
//     detailedContent: "Exercise isn’t just about fitness—it’s medicine for your mind and body. Cardio strengthens your heart, strength training builds lean muscle, and stretching maintains flexibility. Even a 20-minute daily walk reduces the risk of chronic disease. Find an activity you enjoy to make movement sustainable."
//   },
//   {
//     id: "3",
//     title: "Hormones",
//     icon: "dna",
//     color: "#a855f7ff",
//     description: "Hormones regulate mood, energy, sleep, and metabolism.",
//     detailedContent: "Your hormones are chemical messengers that impact almost every system in your body. Poor sleep, chronic stress, or nutrient deficiencies can throw them off balance. Learn about natural ways to regulate hormones through diet, stress management, and healthy routines before relying on medication."
//   },
//   {
//     id: "4",
//     title: "Supplements",
//     icon: "pill",
//     color: "#f59e0bff",
//     description: "Smart supplementation supports diet and lifestyle.",
//     detailedContent: "Supplements can help fill nutritional gaps but should never replace whole foods. Common ones include Vitamin D, Omega-3, Magnesium, and probiotics. Always consult with a professional before starting new supplements, as needs vary by age, diet, and lifestyle."
//   },
//   {
//     id: "5",
//     title: "Sleep",
//     icon: "bed",
//     color: "#0ea5e9ff",
//     description: "Deep rest restores body and mind for peak performance.",
//     detailedContent: "Adults need 7–9 hours of sleep for optimal recovery. Poor sleep affects mood, memory, and hormone regulation. Create a bedtime ritual—dim lights, avoid screens, and keep your room cool and dark. Good sleep hygiene builds a strong foundation for health."
//   },
//   {
//     id: "6",
//     title: "Stress",
//     icon: "brain",
//     color: "#f43f5eff",
//     description: "Chronic stress drains health—learn to reset and recharge.",
//     detailedContent: "Stress activates your body’s ‘fight or flight’ system. While short bursts can be helpful, chronic stress weakens immunity and causes burnout. Techniques like mindfulness, journaling, deep breathing, and physical activity help manage stress effectively."
//   },
//   {
//     id: "7",
//     title: "Mindfulness",
//     icon: "meditation",
//     color: "#14b8a6ff",
//     description: "Stay present, reduce anxiety, and increase focus.",
//     detailedContent: "Mindfulness is the practice of living in the moment. It lowers stress and improves clarity. Try guided meditation, mindful eating, or simply focusing on your breath for a few minutes daily. Over time, this builds resilience and emotional balance."
//   },
//   {
//     id: "8",
//     title: "Hydration",
//     icon: "cup-water",
//     color: "#60a5faff",
//     description: "Water fuels your cells, organs, and brain function.",
//     detailedContent: "Hydration is vital for digestion, circulation, and energy. Dehydration can cause fatigue, headaches, and poor concentration. Aim for 2–3 liters per day, but adjust based on activity and climate. Herbal teas and fruits with high water content can also help."
//   },
// ];

const DATTA = [
  {
    id: '1',
    title: 'Diet',
    icon: 'food-apple',
    color: '#34d399ff',
    description: 'Balanced nutrition fuels your energy and overall health.',
    detailedContent: `
 Diet: The Foundation of Health

A diet refers to the variety and quantity of food that a person consumes on a daily basis. Nutrition is one of the cornerstones of good health, yet it is often overlooked in a fast-paced, modern lifestyle. What you eat directly influences your physical health, energy, mood, immunity, and even your risk of developing chronic diseases.

---

 Why Diet Matters
- Provides the fuel for everyday activity and brain function.
- Supplies the body with macronutrients: carbohydrates, proteins, and fats.
- Delivers essential micronutrients like vitamins, minerals, and antioxidants.
- Helps regulate hormones, weight, and metabolism.
- Plays a key role in preventing lifestyle-related diseases like diabetes, obesity, and heart disease.

---

 Types of Diet Approaches
1. Balanced Diet – Includes a variety of foods from all food groups in appropriate proportions. Often recommended by doctors and nutritionists as the gold standard.
2. Vegetarian Diet – Excludes meat, may include dairy and eggs. Rich in fiber and antioxidants.
3. Vegan Diet– Strictly plant-based. Eliminates all animal products and requires careful planning to avoid deficiencies.
4. Ketogenic Diet – Low carbohydrate, high fat. Used for weight loss and managing certain medical conditions.
5. Mediterranean Diet – Emphasizes olive oil, fish, nuts, fruits, vegetables, and whole grains. Linked to longevity and heart health.
6. Intermittent Fasting – Focuses more on *when* you eat rather than *what* you eat. Known to help with insulin sensitivity and fat loss.

---

 Benefits of a Healthy Diet
- Higher energy levels throughout the day.
- Stronger immunity and faster recovery from illness.
- Improved mental clarity and focus.
- Better skin, hair, and overall appearance.
- Reduced risk of chronic illnesses like cancer, heart disease, and diabetes.
- Supports healthy aging and longevity.

---

 Risks of an Unhealthy Diet
- Nutrient deficiencies (iron, vitamin D, B12, calcium).
- Obesity and related complications such as high blood pressure.
- Mood disturbances and higher risk of anxiety/depression.
- Increased inflammation and risk of metabolic syndrome.
- Weaker immune system, leading to frequent illness.

---

 Practical Tips for Everyday Nutrition
- Fill half your plate with vegetables and fruits.
- Choose whole grains over refined grains (brown rice, quinoa, oats).
- Stay hydrated: aim for at least 2–3 liters of water daily.
- Limit added sugars, processed foods, and trans fats.
- Practice mindful eating: chew slowly and eat without distractions.
- Plan meals ahead to avoid unhealthy snacking.

---

 Fun Facts
- The word "diet" originally comes from the Greek word *diaita*, meaning "way of living."
- Eating a rainbow of colors in fruits and vegetables ensures a wide range of nutrients.
- Dark chocolate (70% and above) can actually improve heart health when consumed moderately!

---

 Final Thoughts
Your diet is not just about weight management —it is about fueling your body and mind for a productive, healthy, and happy life. Every meal is an opportunity to nourish yourself. Small, consistent changes in your eating habits can create a lifelong impact.

Remember: You don't need a perfect diet; you just need a sustainable one.
    `,
  },

  {
    id: '2',
    title: 'Exercise',
    icon: 'dumbbell',
    color: '#3b82f6ff',
    description: 'Regular movement improves strength, mood, and longevity.',
    detailedContent: `
 Exercise: Movement as Medicine

Exercise is any physical activity that enhances or maintains physical fitness and overall health. It's one of the most powerful tools for preventing disease, improving mental health, and enhancing quality of life. Regular movement transforms your body from the inside out, affecting everything from your cardiovascular system to your brain chemistry.

---

 Why Exercise Matters
- Strengthens the heart and improves circulation.
- Builds and maintains muscle mass and bone density.
- Releases endorphins, natural mood elevators that combat depression and anxiety.
- Improves insulin sensitivity and blood sugar control.
- Enhances cognitive function and memory.
- Boosts immune system function.
- Increases longevity and reduces risk of chronic diseases.

---

 Types of Exercise
1. **Cardiovascular Exercise** – Running, cycling, swimming, dancing. Improves heart health and endurance.
2. **Strength Training** – Weight lifting, resistance bands, bodyweight exercises. Builds muscle and bone strength.
3. **Flexibility Training** – Yoga, stretching, pilates. Maintains range of motion and prevents injury.
4. **High-Intensity Interval Training (HIIT)** – Short bursts of intense activity followed by rest. Efficient for fat burning and cardiovascular health.
5. **Functional Movement** – Activities that mimic daily tasks. Improves balance and coordination.
6. **Low-Impact Exercise** – Walking, swimming, cycling. Gentle on joints while still providing benefits.

---

 Benefits of Regular Exercise
- Increased energy and stamina throughout the day.
- Better sleep quality and faster sleep onset.
- Improved mood and reduced symptoms of depression.
- Enhanced self-confidence and body image.
- Stronger bones and reduced risk of osteoporosis.
- Better brain function and reduced risk of dementia.
- Increased metabolic rate and easier weight management.

---

 Risks of Sedentary Lifestyle
- Higher risk of heart disease and stroke.
- Increased likelihood of type 2 diabetes.
- Muscle weakness and bone loss.
- Poor posture and back problems.
- Mental health issues including depression and anxiety.
- Reduced life expectancy.

---

 Getting Started: Practical Tips
- Start with just 10-15 minutes daily and gradually increase.
- Choose activities you enjoy to make exercise sustainable.
- Set realistic, achievable goals.
- Find an exercise buddy for accountability and motivation.
- Mix different types of exercise to prevent boredom.
- Listen to your body and allow for rest and recovery.
- Track your progress to stay motivated.

---

 Exercise Guidelines
- **Cardio:** 150 minutes of moderate activity or 75 minutes of vigorous activity per week.
- **Strength:** 2-3 sessions per week targeting all major muscle groups.
- **Flexibility:** Daily stretching or 2-3 yoga sessions per week.
- **Rest:** At least one full rest day per week for recovery.

---

 Fun Facts
- Just 20 minutes of exercise can boost your mood for up to 12 hours.
- Muscle tissue burns more calories at rest than fat tissue.
- Exercise is as effective as medication for treating mild to moderate depression.
- Your brain releases BDNF (brain-derived neurotrophic factor) during exercise, which helps grow new brain cells.

---

 Final Thoughts
Exercise isn't punishment for what you ate or a chore to endure—it's a celebration of what your body can do. Every step, every rep, every stretch is an investment in your future self. The best exercise is the one you'll actually do consistently.

Remember: You don't have to be perfect; you just have to start.
    `,
  },
  {
    id: '3',
    title: 'Hormones',
    icon: 'dna',
    color: '#a855f7ff',
    description: 'Hormones regulate mood, energy, sleep, and metabolism.',
    detailedContent: `
 Hormones: Your Body's Chemical Messengers

Hormones are powerful chemical messengers produced by various glands in your endocrine system. They travel through your bloodstream to tissues and organs, controlling virtually every biological process in your body—from metabolism and growth to mood and reproduction. Understanding and optimizing your hormones is key to feeling your best.

---

 Why Hormones Matter
- Regulate metabolism and weight management.
- Control energy levels throughout the day.
- Influence mood, emotions, and mental clarity.
- Manage sleep-wake cycles and recovery.
- Control reproductive health and libido.
- Affect immune system function.
- Determine how your body responds to stress.

---

 Key Hormones and Their Functions
1. **Insulin** – Regulates blood sugar and fat storage.
2. **Cortisol** – Stress hormone that affects metabolism and immune function.
3. **Thyroid Hormones (T3/T4)** – Control metabolic rate and energy production.
4. **Growth Hormone** – Promotes muscle growth and repair during sleep.
5. **Sex Hormones (Testosterone/Estrogen)** – Affect mood, energy, and reproductive health.
6. **Melatonin** – Regulates sleep-wake cycles.
7. **Leptin and Ghrelin** – Control hunger and satiety signals.

---

 Signs of Hormonal Imbalance
- Unexplained weight gain or difficulty losing weight.
- Chronic fatigue or low energy levels.
- Mood swings, irritability, or depression.
- Sleep problems or insomnia.
- Brain fog or difficulty concentrating.
- Changes in appetite or cravings.
- Low libido or reproductive issues.
- Hair loss or skin problems.

---

 Factors That Disrupt Hormones
- Chronic stress and poor stress management.
- Inadequate or poor-quality sleep.
- Processed foods and excess sugar.
- Environmental toxins and endocrine disruptors.
- Lack of exercise or excessive exercise.
- Nutrient deficiencies.
- Certain medications.

---

 Natural Ways to Balance Hormones
- **Prioritize Sleep:** 7-9 hours of quality sleep for hormone production and regulation.
- **Manage Stress:** Practice meditation, yoga, or other stress-reduction techniques.
- **Eat Whole Foods:** Focus on healthy fats, quality proteins, and fiber-rich carbohydrates.
- **Exercise Regularly:** Both cardio and strength training support hormonal health.
- **Stay Hydrated:** Proper hydration supports all bodily functions.
- **Limit Toxins:** Choose organic when possible, filter water, use natural personal care products.
- **Support Gut Health:** A healthy microbiome influences hormone production.

---

 Hormone-Supporting Foods
- **Healthy Fats:** Avocados, nuts, olive oil, fatty fish (support hormone production).
- **Fiber-Rich Foods:** Vegetables, fruits, whole grains (help eliminate excess hormones).
- **Antioxidants:** Berries, leafy greens, colorful vegetables (reduce inflammation).
- **Adaptogens:** Ashwagandha, maca root, holy basil (help body adapt to stress).
- **Fermented Foods:** Yogurt, kefir, sauerkraut (support gut health).

---

 When to Seek Professional Help
- Persistent symptoms despite lifestyle changes.
- Sudden or dramatic changes in energy, mood, or weight.
- Reproductive health concerns.
- Family history of hormonal disorders.
- Consider comprehensive hormone testing with a qualified healthcare provider.

---

 Fun Facts
- Your body produces over 50 different hormones.
- Hormone levels naturally fluctuate throughout the day and across your lifespan.
- The gut produces many of the same neurotransmitters as the brain.
- Chronic stress can age your cells faster by shortening telomeres.

---

 Final Thoughts
Your hormones are like a symphony orchestra—when they're in harmony, you feel amazing. When they're out of tune, everything feels off. The good news is that lifestyle changes can have a profound impact on hormonal balance.

Remember: Small, consistent changes can create big improvements in how you feel every day.
    `,
  },
  {
    id: '4',
    title: 'Supplements',
    icon: 'pill',
    color: '#f59e0bff',
    description: 'Smart supplementation supports diet and lifestyle.',
    detailedContent: `
 Supplements: Filling the Gaps Wisely

Supplements are concentrated forms of nutrients that can help fill nutritional gaps in your diet or support specific health goals. While they should never replace a balanced diet, strategic supplementation can enhance your health when used properly. The key is understanding what you need and choosing quality products.

---

 Why Consider Supplements
- Modern farming practices may reduce nutrient density in foods.
- Busy lifestyles can make perfect nutrition challenging.
- Certain populations have higher nutrient needs (pregnancy, aging, athletes).
- Some nutrients are difficult to get from food alone (Vitamin D, Omega-3s).
- Environmental factors may increase nutrient requirements.
- Individual genetic variations can affect nutrient absorption and needs.

---

 Essential Supplements to Consider
1. **Vitamin D3** – Supports bone health, immune function, and mood. Most people are deficient.
2. **Omega-3 Fatty Acids** – Anti-inflammatory, supports brain and heart health.
3. **Magnesium** – Involved in 300+ enzymatic reactions, supports sleep and muscle function.
4. **Probiotics** – Support gut health and immune function.
5. **Vitamin B12** – Essential for energy and nervous system, especially for vegetarians/vegans.
6. **Zinc** – Supports immune function, wound healing, and hormone production.
7. **Multivitamin** – Insurance policy for basic nutrient needs.

---

 Supplements for Specific Goals
- **Energy & Fatigue:** B-complex vitamins, CoQ10, Iron (if deficient), Rhodiola.
- **Sleep & Stress:** Magnesium, Melatonin, Ashwagandha, L-theanine.
- **Brain Health:** Omega-3s, Phosphatidylserine, Lion's Mane mushroom.
- **Joint Health:** Glucosamine, Chondroitin, Turmeric, Collagen.
- **Heart Health:** CoQ10, Omega-3s, Garlic extract, Hawthorn.
- **Immune Support:** Vitamin C, Vitamin D, Zinc, Elderberry.

---

 How to Choose Quality Supplements
- Look for third-party testing for purity and potency.
- Choose reputable brands with good manufacturing practices.
- Check for unnecessary fillers, artificial colors, or additives.
- Consider the form of the nutrient (some are better absorbed than others).
- Read reviews and research the company's reputation.
- Consult with healthcare providers for personalized recommendations.

---

 Common Supplementation Mistakes
- Taking too much of fat-soluble vitamins (A, D, E, K).
- Not considering nutrient interactions (some compete for absorption).
- Expecting immediate results (many nutrients take weeks to months to show effects).
- Taking supplements on an empty stomach when they should be taken with food.
- Not cycling certain supplements when appropriate.
- Ignoring quality in favor of cheap options.

---

 Timing and Absorption Tips
- **Fat-soluble vitamins (A, D, E, K):** Take with meals containing healthy fats.
- **Water-soluble vitamins (B, C):** Can be taken on empty stomach, but with food if they cause nausea.
- **Minerals:** Often better absorbed on empty stomach, but may cause upset stomach.
- **Probiotics:** Often best taken on empty stomach or with minimal food.
- **Magnesium:** Better absorbed in smaller, divided doses.

---

 Food First Approach
Remember, supplements work best when combined with:
- A nutrient-dense, whole foods diet.
- Regular physical activity.
- Adequate sleep and stress management.
- Proper hydration.
- Minimizing processed foods and toxins.

---

 When to Avoid Supplements
- Without consulting a doctor if you're taking medications.
- If you have kidney or liver problems (many supplements are processed by these organs).
- During certain medical procedures or surgeries.
- If you're pregnant or nursing (unless specifically recommended by your doctor).
- If you have food allergies without checking ingredient labels carefully.

---

 Fun Facts
- The supplement industry is worth over $140 billion globally.
- Your body can only absorb so much of certain nutrients at once—more isn't always better.
- Some nutrients work synergistically (Vitamin D + K2, Vitamin C + Iron).
- The placebo effect is real—believing supplements will help can actually provide some benefit.

---

 Final Thoughts
Supplements can be valuable tools in your health toolkit, but they're not magic pills. Think of them as insurance for your nutrition, not a substitute for healthy habits. Quality matters more than quantity, and personalization is key.

Remember: Test, don't guess—consider getting nutrient levels tested to guide your supplementation strategy.
    `,
  },
  {
    id: '5',
    title: 'Sleep',
    icon: 'bed',
    color: '#0ea5e9ff',
    description: 'Deep rest restores body and mind for peak performance.',
    detailedContent: `
 Sleep: Your Daily Reset Button

Sleep is not just rest—it's an active, restorative process essential for physical health, mental clarity, and emotional well-being. During sleep, your body repairs tissues, consolidates memories, and recharges for the next day. Quality sleep is as important as good nutrition and regular exercise for optimal health.

---

 Why Sleep Matters
- Allows physical repair and growth hormone release.
- Consolidates memories and clears brain toxins.
- Regulates hormones that control hunger, stress, and mood.
- Strengthens immune system function.
- Improves focus, creativity, and decision-making.
- Supports emotional regulation and mental health.
- Helps maintain healthy weight and metabolism.

---

 The Sleep Cycle Stages
1. **Stage 1 (Light Sleep):** Transition from wakefulness, easy to wake up.
2. **Stage 2 (Light Sleep):** Heart rate and breathing slow, body temperature drops.
3. **Stage 3 (Deep Sleep):** Physical restoration, immune system strengthening, hardest to wake from.
4. **REM Sleep:** Rapid eye movement, dreaming, memory consolidation, brain detoxification.

A complete cycle lasts 90-110 minutes, and you need 4-6 cycles per night for optimal rest.

---

 Sleep Requirements by Age
- **Newborns (0-3 months):** 14-17 hours
- **Infants (4-11 months):** 12-15 hours
- **Toddlers (1-2 years):** 11-14 hours
- **Children (3-5 years):** 10-13 hours
- **School age (6-13 years):** 9-11 hours
- **Teenagers (14-17 years):** 8-10 hours
- **Adults (18-64 years):** 7-9 hours
- **Older adults (65+ years):** 7-8 hours

---

 Signs of Poor Sleep Quality
- Difficulty falling asleep (taking more than 30 minutes).
- Frequent night wakings.
- Waking up feeling unrefreshed.
- Daytime fatigue and sleepiness.
- Difficulty concentrating or remembering.
- Mood changes, irritability, or anxiety.
- Frequent illness or slow recovery.
- Weight gain or difficulty losing weight.

---

 Common Sleep Disruptors
- **Blue light exposure:** Screens suppress melatonin production.
- **Caffeine:** Can affect sleep up to 8 hours after consumption.
- **Alcohol:** Disrupts deep sleep and REM stages.
- **Late meals:** Digestion can interfere with sleep quality.
- **Stress and anxiety:** Racing thoughts make it hard to wind down.
- **Irregular schedule:** Confuses your body's internal clock.
- **Poor sleep environment:** Too bright, noisy, hot, or cold.

---

 Sleep Hygiene Best Practices
- **Consistent schedule:** Go to bed and wake up at the same time daily.
- **Dark environment:** Use blackout curtains or eye masks.
- **Cool temperature:** Keep bedroom between 60-67°F (15-19°C).
- **Quiet space:** Use earplugs or white noise if needed.
- **Comfortable bedding:** Invest in a good mattress and pillows.
- **No screens:** Avoid blue light 1-2 hours before bed.
- **Relaxing routine:** Create a calming pre-sleep ritual.

---

 Natural Sleep Aids
- **Melatonin:** Helps regulate sleep-wake cycles (0.5-3mg, 30 minutes before bed).
- **Magnesium:** Promotes muscle relaxation and calm (200-400mg before bed).
- **L-theanine:** Amino acid that promotes relaxation without drowsiness.
- **Chamomile tea:** Mild sedative effects, traditional sleep remedy.
- **Valerian root:** Herbal supplement that may improve sleep quality.
- **Passionflower:** May help with anxiety-related sleep issues.

---

 Creating the Perfect Sleep Environment
- **Bedroom temperature:** Cool and well-ventilated.
- **Lighting:** As dark as possible, consider red light for evening activities.
- **Sound:** Quiet or consistent white noise.
- **Comfort:** Quality mattress and pillows suited to your sleep position.
- **Purpose:** Use bedroom only for sleep and intimacy.
- **Electronics:** Remove or silence devices that emit light or sounds.

---

 The Power Nap Guide
- **Timing:** Early afternoon (1-3 PM) works best.
- **Duration:** 10-20 minutes for alertness, 90 minutes for full cycle.
- **Avoid:** Late afternoon naps that can interfere with nighttime sleep.
- **Environment:** Dark, quiet, comfortable space.

---

 When to Seek Help
- Chronic insomnia lasting more than 3 weeks.
- Loud snoring or breathing interruptions (sleep apnea).
- Excessive daytime sleepiness despite adequate sleep time.
- Restless legs or periodic limb movements.
- Sleepwalking or other unusual behaviors during sleep.

---

 Fun Facts
- You spend about 1/3 of your life sleeping.
- Dreams occur in all sleep stages, but are most vivid during REM.
- Your brain is more active during REM sleep than when awake.
- Sleep deprivation affects your immune system more than any other factor.
- The world record for staying awake is 11 days (don't try this!).

---

 Final Thoughts
Sleep is not a luxury—it's a necessity. Every hour of quality sleep is an investment in your health, happiness, and productivity. Creating good sleep habits takes time and consistency, but the payoffs are enormous.

Remember: You can't catch up on sleep debt completely, so prioritize consistent, quality rest every night.
    `,
  },
  {
    id: '6',
    title: 'Stress',
    icon: 'brain',
    color: '#f43f5eff',
    description: 'Chronic stress drains health—learn to reset and recharge.',
    detailedContent: `
 Stress: Understanding and Managing Your Body's Alarm System

Stress is your body's natural response to challenges or threats, triggering a cascade of hormones and physiological changes designed to help you survive. While acute stress can be beneficial, chronic stress becomes destructive, affecting every system in your body. Learning to manage stress is crucial for long-term health and well-being.

---

 Why Stress Management Matters
- Chronic stress suppresses immune system function.
- Elevates cortisol levels, leading to weight gain and inflammation.
- Disrupts sleep quality and hormone balance.
- Increases risk of heart disease, diabetes, and mental health disorders.
- Impairs memory, concentration, and decision-making.
- Accelerates cellular aging and shortens lifespan.
- Affects relationships and overall quality of life.

---

 Types of Stress
1. **Acute Stress** – Short-term, immediate response to a specific threat or challenge.
2. **Chronic Stress** – Long-term, ongoing stress from persistent life pressures.
3. **Eustress** – Positive stress that motivates and energizes (exercise, challenges, excitement).
4. **Distress** – Negative stress that overwhelms and depletes resources.
5. **Traumatic Stress** – Result of experiencing or witnessing traumatic events.

---

 The Stress Response System
When you perceive a threat, your body activates:
- **Sympathetic Nervous System:** "Fight or flight" response.
- **HPA Axis:** Hypothalamic-pituitary-adrenal axis releases stress hormones.
- **Cortisol and Adrenaline:** Increase heart rate, blood pressure, and blood sugar.
- **Physical Changes:** Muscle tension, shallow breathing, heightened alertness.

---

 Physical Signs of Chronic Stress
- Headaches and muscle tension.
- Digestive issues (stomach problems, changes in appetite).
- Sleep disturbances or insomnia.
- Frequent infections or slow healing.
- High blood pressure or heart palpitations.
- Fatigue and low energy.
- Skin problems or hair loss.

---

 Emotional and Mental Signs
- Anxiety, worry, or feeling overwhelmed.
- Depression or mood swings.
- Irritability and short temper.
- Difficulty concentrating or making decisions.
- Memory problems.
- Feeling disconnected or isolated.
- Loss of motivation or enjoyment.

---

 Common Stress Triggers
- **Work:** Deadlines, conflicts, job insecurity, overwork.
- **Relationships:** Family problems, social conflicts, loneliness.
- **Financial:** Money worries, debt, economic uncertainty.
- **Health:** Illness, injury, medical concerns.
- **Life Changes:** Moving, divorce, death of loved ones, major transitions.
- **Daily Hassles:** Traffic, technology problems, time pressures.

---

 Immediate Stress Relief Techniques
- **Deep Breathing:** 4-7-8 technique (inhale 4, hold 7, exhale 8).
- **Progressive Muscle Relaxation:** Tense and release muscle groups systematically.
- **Mindful Observation:** Focus on your immediate surroundings using all senses.
- **Quick Walk:** 5-10 minutes of movement to reset your nervous system.
- **Cold Water:** Splash cold water on face or wrists to activate vagus nerve.
- **Gratitude:** List 3 things you're grateful for to shift perspective.

---

 Long-Term Stress Management Strategies
- **Regular Exercise:** Physical activity is one of the most effective stress reducers.
- **Meditation and Mindfulness:** Daily practice builds resilience and emotional regulation.
- **Social Support:** Maintain strong relationships and don't hesitate to ask for help.
- **Time Management:** Prioritize tasks, set boundaries, learn to say no.
- **Hobbies and Recreation:** Engage in activities you enjoy and find fulfilling.
- **Nature Exposure:** Spend time outdoors to reduce cortisol and boost mood.
- **Professional Help:** Therapy, counseling, or stress management programs.

---

 Stress-Busting Lifestyle Habits
- **Sleep:** 7-9 hours of quality sleep to help body recover from stress.
- **Nutrition:** Eat regular, balanced meals; limit caffeine and alcohol.
- **Hydration:** Dehydration can increase cortisol levels.
- **Limit News/Social Media:** Constant negative information increases stress.
- **Boundaries:** Separate work and personal time, create phone-free zones.
- **Routine:** Consistent daily routines provide stability and predictability.

---

 The Power of Mindset
- **Reframe Challenges:** View stressors as opportunities for growth.
- **Focus on Control:** Identify what you can and cannot influence.
- **Accept Imperfection:** Let go of perfectionism and unrealistic expectations.
- **Practice Self-Compassion:** Treat yourself with kindness during difficult times.
- **Stay Present:** Don't waste energy worrying about future "what-ifs."

---

 Stress-Fighting Foods
- **Complex Carbs:** Oatmeal, quinoa, sweet potatoes (boost serotonin).
- **Omega-3 Rich Foods:** Salmon, walnuts, chia seeds (reduce inflammation).
- **Magnesium Sources:** Dark chocolate, leafy greens, nuts (calm nervous system).
- **Antioxidants:** Berries, green tea, colorful vegetables (combat stress damage).
- **Probiotics:** Yogurt, kefir, fermented foods (support gut-brain connection).

---

 When to Seek Professional Help
- Stress interferes with daily functioning for weeks.
- Physical symptoms persist despite stress management efforts.
- Thoughts of self-harm or substance abuse as coping mechanisms.
- Relationships are significantly impacted.
- You feel unable to cope or see solutions.

---

 Fun Facts
- Moderate stress can actually boost immune function and performance.
- Laughter reduces stress hormones and releases endorphins.
- Petting animals can lower cortisol and blood pressure.
- Chronic stress can shrink the prefrontal cortex (decision-making area) and enlarge the amygdala (fear center).

---

 Final Thoughts
Stress is inevitable, but suffering from chronic stress is optional. Building resilience through healthy coping strategies, lifestyle changes, and support systems can transform your relationship with stress. Remember that managing stress is a skill that improves with practice.

Remember: You can't always control what happens to you, but you can control how you respond to it.
    `,
  },
  {
    id: '7',
    title: 'Mindfulness',
    icon: 'meditation',
    color: '#14b8a6ff',
    description: 'Stay present, reduce anxiety, and increase focus.',
    detailedContent: `
 Mindfulness: The Art of Present Moment Awareness

Mindfulness is the practice of purposefully paying attention to the present moment without judgment. Rooted in ancient contemplative traditions but validated by modern science, mindfulness has become a powerful tool for reducing stress, improving mental clarity, and enhancing overall well-being.

---

 Why Mindfulness Matters
- Reduces symptoms of anxiety and depression.
- Improves focus, attention, and cognitive flexibility.
- Lowers stress hormones like cortisol.
- Enhances emotional regulation and resilience.
- Strengthens immune system function.
- Improves relationships through better communication and empathy.
- Increases self-awareness and personal insight.

---

 The Science Behind Mindfulness
Research shows that regular mindfulness practice:
- **Changes Brain Structure:** Increases gray matter in areas associated with learning, memory, and emotional regulation.
- **Reduces Amygdala Activity:** The brain's alarm center becomes less reactive to stress.
- **Strengthens Prefrontal Cortex:** Improves executive function and decision-making.
- **Activates Parasympathetic Nervous System:** Promotes "rest and digest" state.
- **Reduces Inflammation:** Lowers markers of chronic inflammation in the body.

---

 Core Principles of Mindfulness
1. **Present Moment Awareness:** Focus attention on what's happening right now.
2. **Non-Judgmental Observation:** Notice thoughts and feelings without labeling them as good or bad.
3. **Acceptance:** Acknowledge what is without trying to change or fix it immediately.
4. **Beginner's Mind:** Approach experiences with curiosity and openness.
5. **Non-Attachment:** Observe thoughts and emotions without getting caught up in them.

---

 Simple Mindfulness Practices
- **Mindful Breathing:** Focus on the sensation of breath entering and leaving your body.
- **Body Scan:** Systematically notice sensations throughout your body.
- **Mindful Walking:** Pay attention to the movement and sensations of walking.
- **Mindful Eating:** Eat slowly, savoring tastes, textures, and aromas.
- **5-4-3-2-1 Grounding:** Notice 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste.

---

 Formal Meditation Practices
- **Breath Awareness Meditation:** Sit quietly and focus on your breath for 5-20 minutes.
- **Loving-Kindness Meditation:** Send good wishes to yourself and others.
- **Walking Meditation:** Slow, deliberate walking with attention to each step.
- **Open Awareness Meditation:** Notice whatever arises in consciousness without focusing on anything specific.
- **Guided Meditations:** Use apps or recordings to lead your practice.

---

 Informal Mindfulness Throughout the Day
- **Mindful Morning Routine:** Be present during washing, dressing, eating breakfast.
- **Mindful Commuting:** Notice your surroundings instead of being lost in thought.
- **Mindful Work Breaks:** Take 2-3 minutes to breathe and reset between tasks.
- **Mindful Listening:** Give full attention when others are speaking.
- **Mindful Technology Use:** Notice how devices affect your mood and attention.

---

 Common Mindfulness Misconceptions
- **"I must clear my mind of all thoughts":** Mindfulness is about observing thoughts, not eliminating them.
- **"I'm not good at meditation":** There's no "perfect" way; noticing when your mind wanders IS mindfulness.
- **"I need hours of free time":** Even 2-3 minutes of practice can be beneficial.
- **"It's just relaxation":** While relaxing, mindfulness is about awareness, not necessarily feeling calm.
- **"It's selfish or self-indulgent":** Mindfulness makes you more present and compassionate with others.

---

 Building a Mindfulness Practice
- **Start Small:** Begin with 2-5 minutes daily rather than attempting long sessions.
- **Choose a Consistent Time:** Morning, lunch break, or before bed—whatever works for your schedule.
- **Create a Quiet Space:** Designate a peaceful area for practice, even if it's just a corner of a room.
- **Use Guided Resources:** Apps like Headspace, Calm, or Insight Timer can provide structure.
- **Be Patient:** Benefits accumulate over time; consistency matters more than duration.
- **Track Progress:** Keep a simple log of your practice to stay motivated.

---

 Mindfulness for Specific Challenges
- **Anxiety:** Focus on breath and body sensations to anchor yourself in the present.
- **Depression:** Practice loving-kindness and self-compassion exercises.
- **Anger:** Use the STOP technique (Stop, Take a breath, Observe, Proceed mindfully).
- **Pain Management:** Observe sensations without resistance, noticing how they change.
- **Sleep Issues:** Body scan or breath awareness to calm the nervous system before bed.
- **Work Stress:** Mindful breaks between meetings, conscious breathing during pressure.

---

 Integrating Mindfulness with Daily Activities
- **Household Chores:** Pay attention to sensations while washing dishes, folding laundry.
- **Exercise:** Notice your body's movements, breath, and energy during workouts.
- **Relationships:** Practice mindful listening and speaking with family and friends.
- **Driving:** Stay present and aware instead of operating on autopilot.
- **Nature:** Use outdoor time for mindful observation of sights, sounds, and sensations.

---

 Advanced Mindfulness Concepts
- **Impermanence:** Recognizing that all thoughts, emotions, and sensations are temporary.
- **Interconnectedness:** Understanding how all things are related and interdependent.
- **Non-Self:** Observing that the sense of "self" is fluid and constructed.
- **Equanimity:** Maintaining balance and calm regardless of circumstances.
- **Mindful Response vs. Reaction:** Creating space between stimulus and response.

---

 Benefits You May Notice
- **Week 1-2:** Increased awareness of thoughts and habits.
- **Week 3-4:** Improved ability to pause before reacting emotionally.
- **Month 2-3:** Better sleep quality and reduced anxiety levels.
- **Month 4-6:** Enhanced focus and emotional regulation.
- **6+ Months:** Deeper sense of well-being and life satisfaction.

---

 Creating Mindful Environments
- **Digital Boundaries:** Designated phone-free times and spaces.
- **Clutter Reduction:** Clear, organized spaces support clear thinking.
- **Natural Elements:** Plants, natural light, and fresh air enhance mindful awareness.
- **Sensory Awareness:** Notice colors, textures, sounds, and smells in your environment.
- **Intentional Design:** Arrange spaces to remind you to stay present.

---

 Fun Facts
- The word "mindfulness" comes from the Pali word "sati," meaning awareness and remembrance.
- Just 8 weeks of mindfulness practice can measurably change brain structure.
- Mindfulness reduces activity in the default mode network—the "mind-wandering" brain network.
- Children as young as 3-4 years old can learn simple mindfulness techniques.
- Mindful eating can help with weight management and digestive health.

 Final Thoughts
Mindfulness isn't about becoming a different person or achieving a special state of consciousness. It's about becoming more fully yourself—aware, present, and responsive rather than reactive. Every moment offers an opportunity to practice mindfulness, making it one of the most accessible and practical paths to well-being.

Remember: The present moment is the only moment where life actually happens—mindfulness helps you live it fully.
    `,
  },
  {
    id: '8',
    title: 'Hydration',
    icon: 'cup-water',
    color: '#60a5faff',
    description: 'Water fuels your cells, organs, and brain function.',
    detailedContent: `
 Hydration: The Foundation of Life

Water makes up about 60% of your body weight and is involved in virtually every biological process. Proper hydration affects everything from physical performance and cognitive function to mood and appearance. Despite its importance, many people live in a state of chronic mild dehydration without realizing it.

 Why Hydration Matters
- Regulates body temperature through sweating and respiration.
- Transports nutrients and oxygen to cells throughout the body.
- Removes waste products through kidneys and liver.
- Maintains blood volume and circulation.
- Lubricates joints and cushions organs.
- Supports digestion and nutrient absorption.
- Affects brain function, mood, and cognitive performance.

 How Much Water Do You Need?
General guidelines suggest:
- **Men:** About 15.5 cups (3.7 liters) of fluids daily.
- **Women:** About 11.5 cups (2.7 liters) of fluids daily.
- **Pregnant women:** Additional 10 oz (300ml) daily.
- **Breastfeeding women:** Additional 16 oz (500ml) daily.
However, individual needs vary based on:
- Activity level and exercise intensity.
- Climate and temperature (hot, humid conditions increase needs).
- Overall health and fever (illness increases fluid requirements).
- Pregnancy and breastfeeding status.
 Signs of Proper Hydration
- **Urine Color:** Pale yellow to clear (dark yellow indicates dehydration).
- **Frequency:** Urinating every 3-4 hours.
- **Energy Levels:** Consistent energy without afternoon crashes.
- **Skin Elasticity:** Skin bounces back quickly when pinched.
- **Mental Clarity:** Good focus and concentration.
- **Physical Performance:** Strength and endurance at normal levels.
 Signs of Dehydration
- **Mild:** Thirst, dry mouth, less frequent urination, dark-colored urine.
- **Moderate:** Fatigue, dizziness, headache, decreased skin elasticity.
- **Severe:** Extreme thirst, rapid heartbeat, rapid breathing, sunken eyes, confusion.
Even 2% dehydration can significantly impact:
- Physical performance and strength.
- Cognitive function and concentration.
- Mood and emotional regulation.
- Thermoregulation and temperature control.
 Best Sources of Hydration
1. **Pure Water:** The gold standard for hydration.
2. **Herbal Teas:** Caffeine-free options like chamomile, peppermint.
3. **Coconut Water:** Natural electrolytes, especially good post-exercise.
4. **Water-Rich Foods:** Cucumber, watermelon, oranges, soup, yogurt.
5. **Infused Water:** Add fruits, vegetables, or herbs for flavor.
6. **Sparkling Water:** Plain or naturally flavored varieties.
 Hydration Throughout the Day
- **Morning:** Start with 16-20 oz upon waking to rehydrate after sleep.
- **Pre-Exercise:** 17-20 oz, 2-3 hours before activity.
- **During Exercise:** 7-10 oz every 10-20 minutes of activity.
- **Post-Exercise:** 150% of fluid lost (weigh yourself before/after).
- **With Meals:** Small sips to aid digestion, avoid excessive amounts.
- **Evening:** Maintain hydration but reduce intake before bed to minimize sleep disruption.
 Factors That Increase Fluid Needs
- **Exercise and Physical Activity:** Sweat losses need replacement.
- **Hot or Humid Weather:** Increased perspiration and breathing losses.
- **High Altitudes:** Increased breathing rate and fluid losses.
- **Fever and Illness:** Body uses more fluids for healing processes.
- **Air Travel:** Cabin pressure and dry air increase dehydration.
- **Certain Medications:** Diuretics, blood pressure medications.
- **Caffeine and Alcohol:** Have mild diuretic effects.
 Electrolyte Balance
Water alone isn't always enough—electrolytes are minerals that help:
- **Sodium:** Maintains fluid balance and nerve function.
- **Potassium:** Supports muscle function and heart rhythm.
- **Magnesium:** Involved in muscle and nerve function.
- **Calcium:** Important for muscle contractions.
Natural electrolyte sources:
- Sea salt or Himalayan salt in water.
- Coconut water for potassium.
- Leafy greens for magnesium.
- Dairy products for calcium.
 Hydration Mistakes to Avoid
- **Waiting Until You're Thirsty:** Thirst is a late indicator of dehydration.
- **Relying Only on Caffeinated Drinks:** While they contribute to fluid intake, they're not optimal.
- **Drinking Too Much Too Fast:** Can lead to water intoxication or discomfort.
- **Ignoring Urine Color:** One of the best indicators of hydration status.
- **Not Adjusting for Activity:** Failing to increase intake during exercise or hot weather.
- **Assuming All Fluids Are Equal:** Sugary drinks and alcohol can actually impair hydration.
 Hydration for Specific Situations
- **Air Travel:** Drink 8 oz per hour of flight time.
- **Illness:** Increase fluids, especially with fever, vomiting, or diarrhea.
- **Aging:** Kidney function declines, and thirst sensation decreases.
- **Pregnancy:** Increased blood volume requires more fluids.
- **Breastfeeding:** Milk production increases fluid needs significantly.
- **Medication Use:** Some drugs affect fluid balance and requirements.
 Making Hydration Easier
- **Use a Marked Water Bottle:** Track intake throughout the day.
- **Set Reminders:** Phone apps or alarms to prompt regular drinking.
- **Flavor Your Water:** Natural additions like lemon, mint, or cucumber.
- **Eat Hydrating Foods:** Include water-rich fruits and vegetables.
- **Create Habits:** Link water drinking to existing routines.
- **Keep Water Visible:** Having it in sight increases consumption.
 Quality Matters Too
- **Filtered Water:** Removes chlorine, heavy metals, and other contaminants.
- **Avoid Plastic When Possible:** Use glass or stainless steel containers.
- **Check Your Source:** If using tap water, know what's in your local supply.
- **Consider Mineralization:** Some prefer water with natural minerals.
- **Temperature Preference:** Room temperature is often better absorbed than ice-cold.
 Fun Facts
- Your brain is 73% water, your lungs are 83% water.
- You can survive weeks without food but only days without water.
- Proper hydration can improve skin appearance and reduce signs of aging.
- The color of your urine can indicate more than hydration—it can reveal health issues.
- Drinking water can temporarily boost metabolism by up to 30%.
 Final Thoughts
Hydration is one of the simplest yet most impactful things you can do for your health. It doesn't require expensive supplements or complicated protocols—just consistent attention to your body's most basic need. Making hydration a priority will enhance every other aspect of your health journey.

Remember: Your body is constantly losing water through breathing, sweating, and other processes—make replenishing it a daily priority.
    `,
  },
];
const DATA = [
  {
    id: '1',
    title: 'Diet',
    icon: 'food-apple',
    color: '#34d399ff',
    description: 'Balanced nutrition fuels your energy and overall health.',
    detailedContent: `Diet: The Foundation of Health...`,
    subcategories: [
      {
        id: "1-1",
        title: "Balanced Diet",
        image: "https://westernnews.media.clients.ellingtoncms.com/img/photos/2018/08/09/Balanced-Diet.jpg",
        shortDescription: "Fuel your energy & overall health.",
        detailedContent: [
          "Include all food groups in proper proportion.",
          "Focus on whole grains, lean protein, healthy fats.",
          "Eat colorful vegetables & fruits daily.",
          "Stay hydrated: 2-3 liters per day.",
        ],
      },
      {
        id: "1-2",
        title: "Keto Diet",
        image: "https://img.freepik.com/free-photo/keto-diet-food_1098-18623.jpg",
        shortDescription: "Low carb, high fat for energy & weight control.",
        detailedContent: [
          "High fats, moderate proteins, very low carbs.",
          "Good for insulin sensitivity & fat loss.",
          "Avoid sugars & processed carbs.",
          "Include healthy fats: avocado, nuts, olive oil.",
        ],
      },
      {
        id: "1-3",
        title: "Vegetarian Diet",
        image: "https://images.unsplash.com/photo-1543353071-873f17a7a088",
        shortDescription: "Plant-based nutrition for immunity & energy.",
        detailedContent: [
          "Include legumes, tofu, lentils, and dairy.",
          "Ensure sufficient protein & iron.",
          "Eat diverse colorful vegetables.",
          "Combine with nuts & seeds for healthy fats.",
        ],
      },
      {
        id: "1-4",
        title: "Vegan Diet",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
        shortDescription: "Strictly plant-based for optimal health.",
        detailedContent: [
          "Eliminate all animal products.",
          "Ensure protein and vitamin B12 intake.",
          "Focus on grains, legumes, nuts, seeds, vegetables.",
          "Consider fortified foods or supplements.",
        ],
      },
      {
        id: "1-5",
        title: "Mediterranean Diet",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        shortDescription: "Heart-healthy diet rich in fruits, vegetables, & olive oil.",
        detailedContent: [
          "Emphasizes olive oil, fish, nuts, fruits, vegetables.",
          "Supports longevity and heart health.",
          "Moderate intake of dairy and lean meats.",
          "Balanced and sustainable lifestyle diet.",
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Exercise',
    icon: 'dumbbell',
    color: '#3b82f6ff',
    description: 'Regular movement improves strength, mood, and longevity.',
    detailedContent: `Exercise: Movement as Medicine...`,
    subcategories: [
      {
        id: "2-1",
        title: "Cardio",
        image: "https://images.unsplash.com/photo-1554284126-cc0d2d6d3f05",
        shortDescription: "Running, cycling, swimming for heart health.",
        detailedContent: [
          "Improves cardiovascular endurance.",
          "Burns calories and boosts metabolism.",
          "Enhances lung capacity and stamina.",
        ],
      },
      {
        id: "2-2",
        title: "Strength Training",
        image: "https://images.unsplash.com/photo-1594737625785-8a73b3f61dff",
        shortDescription: "Weight lifting and resistance exercises.",
        detailedContent: [
          "Builds muscle and bone strength.",
          "Improves posture and functional fitness.",
          "Boosts metabolism and fat loss.",
        ],
      },
      {
        id: "2-3",
        title: "Flexibility & Mobility",
        image: "https://images.unsplash.com/photo-1594737625678-7f3b9b3f5f0d",
        shortDescription: "Yoga, stretching, and mobility exercises.",
        detailedContent: [
          "Maintains range of motion.",
          "Reduces risk of injury.",
          "Improves circulation and posture.",
        ],
      },
      {
        id: "2-4",
        title: "HIIT",
        image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
        shortDescription: "High-Intensity Interval Training for fat burn & endurance.",
        detailedContent: [
          "Short bursts of intense activity.",
          "Efficient calorie burn in less time.",
          "Improves cardiovascular fitness.",
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Hormones',
    icon: 'dna',
    color: '#a855f7ff',
    description: 'Hormones regulate mood, energy, sleep, and metabolism.',
    detailedContent: `Hormones: Your Body's Chemical Messengers...`,
    subcategories: [
      {
        id: "3-1",
        title: "Insulin",
        image: "https://images.unsplash.com/photo-1588776814546-7f92d889e230",
        shortDescription: "Regulates blood sugar & fat storage.",
        detailedContent: [
          "Maintains blood glucose levels.",
          "Supports energy utilization.",
          "Works with diet and exercise for metabolic health.",
        ],
      },
      {
        id: "3-2",
        title: "Cortisol",
        image: "https://images.unsplash.com/photo-1588776814520-8c74fabe11d1",
        shortDescription: "Stress hormone affecting metabolism & immunity.",
        detailedContent: [
          "Elevated during stress.",
          "Influences fat storage & energy use.",
          "Needs balance for overall health.",
        ],
      },
      {
        id: "3-3",
        title: "Thyroid Hormones",
        image: "https://images.unsplash.com/photo-1593529467227-71a8872e87e8",
        shortDescription: "Regulate metabolism and energy production.",
        detailedContent: [
          "Control basal metabolic rate.",
          "Influence weight, energy, and temperature regulation.",
          "Support growth and development.",
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Supplements',
    icon: 'pill',
    color: '#f59e0bff',
    description: 'Smart supplementation supports diet and lifestyle.',
    detailedContent: `Supplements: Filling the Gaps Wisely...`,
    subcategories: [
      {
        id: "4-1",
        title: "Vitamin D3",
        image: "https://images.unsplash.com/photo-1588776814550-1c1b0a5a6b44",
        shortDescription: "Supports bone health, immune function, and mood.",
        detailedContent: [
          "Most people are deficient.",
          "Take with healthy fats for absorption.",
          "Helps maintain strong bones.",
        ],
      },
      {
        id: "4-2",
        title: "Omega-3",
        image: "https://images.unsplash.com/photo-1588776814522-5cda82707aef",
        shortDescription: "Supports brain and heart health.",
        detailedContent: [
          "Anti-inflammatory benefits.",
          "Supports heart and brain function.",
          "Found in fatty fish, flax, chia seeds.",
        ],
      },
      {
        id: "4-3",
        title: "Probiotics",
        image: "https://images.unsplash.com/photo-1588776814518-7f4a0a9b8eae",
        shortDescription: "Supports gut health and immunity.",
        detailedContent: [
          "Helps maintain healthy gut microbiome.",
          "Supports digestion and immunity.",
          "Found in yogurt, kefir, fermented foods.",
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Sleep',
    icon: 'bed',
    color: '#0ea5e9ff',
    description: 'Deep rest restores body and mind for peak performance.',
    detailedContent: `Sleep: Your Daily Reset Button...`,
    subcategories: [
      {
        id: "5-1",
        title: "Deep Sleep",
        image: "https://images.unsplash.com/photo-1588776814540-2d9a6a89e22c",
        shortDescription: "Restorative sleep for body repair and immunity.",
        detailedContent: [
          "Stage 3 of sleep cycle.",
          "Supports physical restoration.",
          "Boosts immune function and memory.",
        ],
      },
      {
        id: "5-2",
        title: "REM Sleep",
        image: "https://images.unsplash.com/photo-1588776814543-1e5f7c5d3e8b",
        shortDescription: "Dream stage for memory consolidation and brain detox.",
        detailedContent: [
          "Rapid eye movement stage.",
          "Essential for learning and memory.",
          "Promotes mental health and emotional processing.",
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'Stress',
    icon: 'brain',
    color: '#f43f5eff',
    description: 'Chronic stress drains health—learn to reset and recharge.',
    detailedContent: `Stress: Understanding and Managing Your Body's Alarm System...`,
    subcategories: [
      {
        id: "6-1",
        title: "Acute Stress",
        image: "https://images.unsplash.com/photo-1588776814524-3d5e8c2f3f7a",
        shortDescription: "Short-term stress response.",
        detailedContent: [
          "Immediate response to challenges.",
          "Can improve focus and reaction time.",
          "Usually temporary and manageable.",
        ],
      },
      {
        id: "6-2",
        title: "Chronic Stress",
        image: "https://images.unsplash.com/photo-1588776814525-4f3d9c4e5b6a",
        shortDescription: "Long-term stress impacting health.",
        detailedContent: [
          "Leads to hormonal imbalance.",
          "Affects sleep, metabolism, and immunity.",
          "Needs active management strategies.",
        ],
      },
    ],
  },
  {
    id: '7',
    title: 'Mindfulness',
    icon: 'meditation',
    color: '#14b8a6ff',
    description: 'Stay present, reduce anxiety, and increase focus.',
    detailedContent: `Mindfulness: The Art of Present Moment Awareness...`,
    subcategories: [
      {
        id: "7-1",
        title: "Breathing Meditation",
        image: "https://images.unsplash.com/photo-1588776814526-6e5b9c7f8c6d",
        shortDescription: "Focus on breath to calm the mind.",
        detailedContent: [
          "Conscious awareness of inhalation & exhalation.",
          "Reduces stress and anxiety.",
          "Can be done anytime, anywhere.",
        ],
      },
      {
        id: "7-2",
        title: "Body Scan",
        image: "https://images.unsplash.com/photo-1588776814527-7f6a8c8f9d7e",
        shortDescription: "Notice sensations throughout the body.",
        detailedContent: [
          "Enhances body awareness.",
          "Promotes relaxation and stress reduction.",
          "Helps release tension areas.",
        ],
      },
    ],
  },
  {
    id: '8',
    title: 'Hydration',
    icon: 'cup-water',
    color: '#60a5faff',
    description: 'Water fuels your cells, organs, and brain function.',
    detailedContent: `Hydration: The Foundation of Life...`,
    subcategories: [
      {
        id: "8-1",
        title: "Daily Water Intake",
        image: "https://images.unsplash.com/photo-1588776814528-8f7b9c9e0a8f",
        shortDescription: "Maintain optimal hydration throughout the day.",
        detailedContent: [
          "Drink 2-3 liters daily depending on activity.",
          "Monitor urine color for hydration status.",
          "Avoid excessive sugary drinks.",
        ],
      },
      {
        id: "8-2",
        title: "Electrolyte Balance",
        image: "https://images.unsplash.com/photo-1588776814529-9f8c9d0b1b9a",
        shortDescription: "Maintain sodium, potassium & magnesium levels.",
        detailedContent: [
          "Important during exercise or heat.",
          "Supports muscle function & hydration.",
          "Include natural sources like fruits, veggies, and salts.",
        ],
      },
    ],
  },
];



export default function CategoryGrid({ onPressItem }) {
  const [showAll, setShowAll] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() => onPressItem?.(item)}
      activeOpacity={0.8}
    >
      <View style={[styles.card, { backgroundColor: item.color }]}>
        <Icon name={item.icon} size={46} color="white" />
      </View>
      <Text numberOfLines={1} style={styles.cardText}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const visibleData = showAll ? DATA : DATA.slice(0, 8);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Daily Wellness</Text>
        {/* <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.seeAll}>{showAll ? "Show less" : "See all"}</Text>
        </TouchableOpacity> */}
      </View>

      <FlatList
        data={visibleData}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        numColumns={4}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 6 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, 
    backgroundColor: '#fff' 
  
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', paddingHorizontal: 10 },
  seeAll: { fontSize: 14, color: Colors.grayPRI, paddingHorizontal: 10 },

  row: { justifyContent: 'space-between', marginBottom: 8 },

  cardWrapper: {
    flex: 1 / 4,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  card: {
    width: 70,
    height: 70,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.grayPRI,
    textAlign: 'center',
  },
});
